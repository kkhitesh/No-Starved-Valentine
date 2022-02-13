const dasha = require("@dasha.ai/sdk");
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

const responses = [
  "Order is out for delivery, it would reach within 20 minutes",
  "Your order is being prepared , have paitence for a while, it would reach in 30 minutes",
  "Your order will be ready in 15 minutes",
];

let response = responses[Math.floor(Math.random() * responses.length)];

app.set("view engine", "ejs");

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
  console.log(req.body.From);

  const msg = req.body.Body;
  const num = req.body.From.split(":")[1];

  const twiml = new MessagingResponse();

  if (msg == "call" || msg == "Call" || msg == "CALL") {
    twiml.message(`Please wait, we are calling you ! 😊`);

    res.writeHead(200, { "Content-Type": "text/xml" });

    res.end(twiml.toString());
    dashaCall(num);
  } else {
    twiml.message(`I am sorry, please try again. 😊`);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  }
});

app.get("/", (_req, res) => {
  res.render("pages/index");
});

app.post("/", (req, res) => {
  dashaCall(req.body.phone);
  res.json({ success: true });
});

app.listen(port, () => console.log(`listening on port ${port}`));

async function dashaCall(phone) {
  const app = await dasha.deploy("./app");

  app.connectionProvider = async (conv) =>
    conv.input.phone === "chat"
      ? dasha.chat.connect(await dasha.chat.createConsoleChat())
      : dasha.sip.connect(new dasha.sip.Endpoint("default"));

  app.ttsDispatcher = () => "dasha";

  app.setExternal("function1", (args) => {
    console.log(args.log);
  });

  await app.start();

  const conv = app.createConversation({ phone: phone, res: response });
  if (conv.input.phone !== "chat") conv.on("transcription", console.log);

  const result = await conv.execute();

  console.log(result.output);

  await app.stop();
  app.dispose();
}
