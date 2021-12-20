import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoute.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("app is running");
});

app.use("/api/products", productRouter);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${5000}`.yellow.bold
  )
);
