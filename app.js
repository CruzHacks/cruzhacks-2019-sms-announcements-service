const express = require("express");
const bodyParser = require("body-parser");
const { checkAPIKey } = require("./routes/middleware/authentication");

// Instances
const app = express();

// Constants
const PORT = process.env.PORT || 3000;
const STAGE = process.env.STAGE || "Development";

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkAPIKey);

// Routes
app.get("/api/", (req, res) => {
  console.log(req);
  console.log(res);
  res.json({
    code: 200,
    method: "GET",
    error: false,
    timestamp: new Date().toISOString()
  });
});

app.post("/api/", (req, res) => {
  res.json({
    code: 200,
    method: "POST",
    error: false,
    timestamp: new Date().toISOString(),
    request: req.body,
    message: "Text Sent"
  });
});

app.listen(PORT, () => {
  const metaData = {
    port: PORT,
    stage: STAGE,
    env: process.env
  };

  console.log(`Service Listening On Port ${metaData.port}`);
  console.log(`Enviorment Data: ${JSON.stringify(metaData, null, 2)}`);
  console.log("\nAPI Launched Successfully");
});
