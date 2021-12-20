import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    //will delete existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    //will add data as in data folder
    //for inserting users
    const createdUsers = await User.insertMany(users);
    //store the first one's id in admin
    const adminUser = createdUsers[0]._id;
    //map admins id in every product as user id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    //add sample product in db
    await Product.insertMany(sampleProducts);
    console.log("Data imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit();
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit();
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
