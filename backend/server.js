import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import Razorpay from 'razorpay'
import fs from 'fs'
import colors from 'colors'
import morgan from 'morgan'
import  {validateWebhookSignature} from "razorpay/dist/utils/razorpay-utils.js";

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadroutes from './routes/uploadRoutes.js'
import Order from './models/orderModel.js'

dotenv.config()

connectDB()

const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadroutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// razor pay 
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});

const readData = () => {
  if (fs.existsSync("order.json")) {
    const data = fs.readFileSync("order.json");
    return JSON.parse(data);
  }
  return [];
};

const writeData = (data) => {
  fs.writeFileSync("order.json", JSON.stringify(data, null, 2));
};

if (!fs.existsSync("order.json")) {
  writeData([]);
}

app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    const options = {
      amount: amount * 100,
      currency,
      receipt,
      notes,
    };
    const order = await razorpay.orders.create(options);

    const orders = readData();
    orders.push({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: "created",
    });
    writeData(orders);

    res.json(order);
  } catch (err) {
    console.log(err);
  }
});

app.get("/payment-success", (req, res) => {
  res.sendFile(path.join(__dirname, "success.html"));
});

app.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, produtOrderId } =
    req.body;

  const secret = razorpay.key_secret;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      secret
    );
    if (isValidSignature) {
      const orders = readData();
      const order = orders.find((o) => o.order_id === razorpay_order_id);
      // if (order) {
      //   order.status = "paid";
      //   order.payment_id = razorpay_payment_id;
      //   writeData(orders);
      // }
      const order1 = await Order.findById(produtOrderId);
      if (order1) {
        (order1.isPaid = true),
          (order1.paidAt = Date.now())
        const updatedorder1 = await order1.save();
        res.status(200).json({ status: "ok" });
        console.log("Payment verification successful!");
      } else {
        res.status(400).json({ status: "verification_failed" });
        console.log("payment verification failed");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", mesg: "error verifying payment" });
  }
});

// razor pay end

//make a folder static here "uploads"
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.send('app is running')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
