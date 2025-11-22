import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Lucix API is running 🚀");
});

// Render port requirement
const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Lucix API running on port ${port}`);
});

