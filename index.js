const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const env = require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }));
app.use(bodyParser.json({ limit: "500mb" }));

const port = 8080;
app.use(
  cors({
    origin: "*",
  })
);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsapp = process.env.TWILIO_WHATSAPP;

const client = require("twilio")(accountSid, authToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/send", (req, res) => {
  const name = req.body.name;
  const num = "whatsapp:" + req.body.num;
  const order = req.body.order;
  client.messages
    .create({
      from: whatsapp,
      to: num,
      body: `Hello ${name}, your order is on its way!
        Reciept: ${order}
        Thank you for using our service!
      `,
    })
    .then((message) => res.send(`Message ${message.sid}`));
});

app.post("/receive", (req, res) => {
  console.log(`New message: ${req.body.Body}`);

  const twiml = new MessagingResponse();

  twiml.message(`You sent ${req.body.Body}`);

  res.writeHead(200, { "Content-Type": "text/xml" });

  res.end(twiml.toString());
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
