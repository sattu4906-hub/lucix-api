import express from "express";
const app = express();

// Your routes here
app.get("/", (req, res) => {
  res.send("Lucix API is running 🚀");
});

// ✅ Required for Render
const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Lucix API running on port ${port}`);
});

