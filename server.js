const express = require("express");
const bodyParser = require("body-parser");

// dynamic node-fetch loader (works on all Node versions)
const fetchFn = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(bodyParser.json());

// set secret via env var or fallback
const SECRET = process.env.LUCIX_KEY || "lucix-secret-key";

app.post("/api/chat", async (req, res) => {
  try {
    const key = req.headers["x-api-key"];
    if (!key || key !== SECRET) return res.status(401).json({ error: "Unauthorized" });

    const prompt = req.body.prompt;
    if (!prompt) return res.status(400).json({ error: "Prompt missing" });

    const r = await fetchFn("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gemma3:12b", prompt })
    });

    const data = await r.json();
    return res.json({ reply: data.response || data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.toString() });
  }
});

app.listen(3000, () => console.log("Lucix API running at http://localhost:3000"));
