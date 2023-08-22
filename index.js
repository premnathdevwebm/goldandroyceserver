const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = 4000;

const apiKey = process.env["BREVOAPI_KEY"];

app.use(express.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
  const apiUrl = "https://api.brevo.com/v3/smtp/email";

  const requestData = {
    sender: {
      name: "GoldandRoyce",
      email: "eng.prem007@gmail.com",
    },
    to: [{email: req.body.to, name: "goldandroyce"}],
    subject: req.body.subject,
    htmlContent: req.body.htmlContent,
  };

  const headers = {
    accept: "application/json",
    "api-key": apiKey,
    "content-type": "application/json",
  };

  try {
    const response = await axios.post(apiUrl, requestData, { headers });
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response ? error.response.data : error.message
    );
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: "An error occurred while sending the email." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
