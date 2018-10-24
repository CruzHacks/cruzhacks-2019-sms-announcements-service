const express = require("express");
const { routes } = require("./routes/routes");

// Instances
const app = express();

// Initialize Routes
routes(app);

// Constants
const PORT = process.env.PORT || 3000;
const STAGE = process.env.STAGE || "Development";

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
