import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/database.js";
import userRoutes from "./routes/user.routes.js"
import shopRoutes from "./routes/shop.routes.js"
import orderRoutes from "./routes/order.routes.js"
import leadRoutes from "./routes/lead.routes.js"
import inventoryRoutes from "./routes/inventory.routes.js"
import calllogRoutes from "./routes/calllog.routes.js"
import VapiRoutes from "./routes/vapi.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js"

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",

    ],
    credentials: true,
  })
)

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/calllogs", calllogRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use("/api", VapiRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:" + process.env.PORT);
  connectDB();

});