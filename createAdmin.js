import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./src/models/Admin.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const existingAdmin = await Admin.findOne({
  email: "admin@bynixtechnology.com"
});

if (existingAdmin) {
  console.log("Admin already exists");
  process.exit();
}

const password = await bcrypt.hash("bynixAdminTechnology@935256#3337", 10);

await Admin.create({
  email: "admin@bynixtechnology.com",
  password: password
});

console.log("Admin created");

process.exit();