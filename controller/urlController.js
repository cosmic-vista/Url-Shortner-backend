import Url from "../models/url.model.js";

import { nanoid } from "nanoid";
import User from "../models/user.model.js";

export const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const userId = req.user.userId; // Extract user ID from authenticated request
  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  try {
    const shortCode = nanoid(8);
    const shortUrl = `${baseUrl}/${shortCode}`;
    const newUrl = new Url({
      originalUrl,
      shortCode,
      shortUrl,
      user: userId,
    });
    await newUrl.save();
    return res.status(201).json({ "saved url is ": newUrl });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getUserUrls = async (req, res) => {
  try {
    const userId = req.user.userId;
    const urls = await Url.find({ user: userId }).sort({ createdAt: -1 });
    return res.status(200).json({ count: urls.length, urls });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;
  try {
    console.log("short code insode get original url", shortCode);
    const originalEntry = await Url.findOne({ shortCode });
    console.log(originalEntry);
    if (!originalEntry) {
      return res.status(404).json({ error: "URL not found" });
    }
    return res.redirect(originalEntry.originalUrl);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const urlDoc = await Url.findOne({ shortCode });
    if (!urlDoc) {
      return res.status(404).json({ message: "no url exist" });
    }
    await Url.deleteOne({ shortCode });
    return res
      .status(200)
      .json({ message: "url deleted successfully", url: urlDoc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
