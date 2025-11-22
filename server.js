import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Lucix API running on Railway 🚀");
});

// Required by Railway
const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Lucix API running on port ${port}`);
});
