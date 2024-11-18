import express from "express";
import { config } from "dotenv";
import DBConnection from "./config/DbConnect.js";
import userRoutes from "./routes/user.routes.js";
import carRoutes from "./routes/car.routes.js";
import cookieParser from "cookie-parser";
import { v2 } from "cloudinary";
import path from "path";
config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT;
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.listen(PORT, async () => {
  await DBConnection();
  console.log("app is listening on ", +PORT);
});
app.use("/api/user", userRoutes);
app.use("/api/car", carRoutes);
const __dirname = path.resolve();
console.log("__dirname",__dirname);
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
