import {
  createShortUrl,
  deleteShortUrl,
  getOriginalUrl,
  getUserUrls,
} from "../controller/urlController.js";
import { auth } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.post("/shorten", auth, createShortUrl);
router.get("/allUrls", auth, getUserUrls);
router.get("/:shortCode", auth, getOriginalUrl);
router.delete("/:shortCode", auth, deleteShortUrl);

export default router;
