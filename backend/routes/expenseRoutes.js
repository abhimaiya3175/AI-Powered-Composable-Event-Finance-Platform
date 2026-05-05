const express = require("express");
const Expense = require("../models/Expense");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer config (memory storage)
const upload = multer({ storage: multer.memoryStorage() });

// Helper: upload buffer to Cloudinary via a proper Promise wrapper
function uploadToCloudinary(fileBuffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "receipts" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
}

// ADD EXPENSE WITH RECEIPT
router.post("/add", upload.single("receipt"), async (req, res) => {
  try {
    const { eventId, amount, category } = req.body;

    if (!eventId || !amount || !category) {
      return res.status(400).json({ message: "All fields required" });
    }

    let receiptUrl = "";

    if (req.file) {
      try {
        console.log(`Uploading receipt (${req.file.originalname}, ${req.file.size} bytes) to Cloudinary...`);
        const uploadResult = await uploadToCloudinary(req.file.buffer);
        receiptUrl = uploadResult.secure_url;
        console.log(`Receipt uploaded: ${receiptUrl}`);
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError.message);
        // Continue saving the expense without the receipt URL
      }
    }

    const expense = new Expense({
      eventId,
      amount,
      category,
      receiptUrl
    });

    await expense.save();
    res.status(201).json(expense);

  } catch (error) {
    console.error("Expense creation error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET EXPENSES BY EVENT
router.get("/:eventId", async (req, res) => {
  try {
    const expenses = await Expense.find({ eventId: req.params.eventId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE EXPENSE
router.delete("/delete/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
