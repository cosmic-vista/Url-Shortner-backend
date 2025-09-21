import mongoose from "mongoose";
import { de } from "zod/locales";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    shortUrl: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relationship
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);
export default Url;
