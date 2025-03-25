import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

// In-memory storage for receipts
let receipts = {};

// POST
app.post("/receipts/process", (req, res) => {
  const receipt = req.body;

  if (
    !receipt.retailer ||
    !receipt.purchaseDate ||
    !receipt.purchaseTime ||
    !receipt.items ||
    !receipt.total
  ) {
    return res.status(400).json({ message: "Invalid receipt data" });
  }

  const receiptId = uuidv4();

  receipts[receiptId] = receipt;

  res.status(200).json({ id: receiptId });
});

// GET
app.get("/receipts/:id/points", (req, res) => {
  const { id } = req.params;
  const receipt = receipts[id];

  if (!receipt) {
    return res.status(404).json({ message: "Receipt not found" });
  }

  const points = calculatePoints(receipt);

  res.status(200).json({ points });
});

function calculatePoints(receipt) {
  let points = 0;

  // Rule 1: Alphanumeric characters in retailer name
  const retailerName = receipt.retailer;
  const retailerPoints = retailerName.replace(/[^a-zA-Z0-9]/g, "").length;
  points += retailerPoints;

  // Rule 2: Round dollar amount
  const total = parseFloat(receipt.total);
  if (Number.isInteger(total)) {
    points += 50;
  }

  // Rule 3: Multiple of 0.25
  if (total % 0.25 === 0) {
    points += 25;
  }

  // Rule 4: Points for item count (5 points for every two items)
  const itemPoints = Math.floor(receipt.items.length / 2) * 5;
  points += itemPoints;

  // Rule 5: Trimmed description length must be a multiple of 3
  for (let item of receipt.items) {
    const trimmedDescription = item.shortDescription.trim();
    if (trimmedDescription.length % 3 === 0) {
      const price = parseFloat(item.price);
      const descriptionPoints = Math.ceil(price * 0.2);
      points += descriptionPoints;
    }
  }

  // Rule 6: Odd day for purchase date
  const purchaseDate = receipt.purchaseDate; // Assuming it's in "YYYY-MM-DD" format
  const dayOfMonth = parseInt(purchaseDate.split("-")[2], 10); // Get the day (third part of the date)
  if (dayOfMonth % 2 !== 0) {
    points += 6;
  }

  // Rule 7: Time between 2:00pm and 4:00pm
  const purchaseTime = receipt.purchaseTime;
  const [hour, minute] = purchaseTime.split(":").map(Number);
  if (hour >= 14 && hour < 16) {
    points += 10;
  }

  return points;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
