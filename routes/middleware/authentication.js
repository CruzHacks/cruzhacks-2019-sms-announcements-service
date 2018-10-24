const KEY = process.env.API_KEY || "Bearer dev1668!";

const checkAPIKey = (req, res, next) => {
  console.log(`Bearer ${req.get("Authorization")}`);

  if (req.get("Authorization") === KEY) {
    console.log("Correct API Key");
    next();
  } else {
    const time = new Date().toISOString();
    const clientResponse = {
      code: 401,
      error: true,
      timeStamp: time,
      errorData: {
        type: "API:Error",
        message: "Incorrect API Key"
      }
    };

    console.log("WARNING: REQUEST MADE WITH INVALID API KEY.");
    console.log(`Time Stamp: ${time}`);
    console.log(clientResponse.errorData);

    res.json(clientResponse);
  }
};

module.exports = { checkAPIKey };
