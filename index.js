import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import urlRoutes from "./routes/url.routes.js";
import cookieParser from "cookie-parser";
import Url from "./models/url.model.js";
const app = express();
app.use(cookieParser());

connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/url", urlRoutes);

app.get("/", (req, res) => {
  return res.json({ server: "server is running" });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
