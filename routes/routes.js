const bodyParser = require("body-parser");
const { checkAPIKey } = require("./middleware/authentication");

const routes = app => {
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
};

module.exports = { routes };
