const dasha = require("@dasha.ai/sdk");
const express = require('express')
const app = express()

app.use(express.json())


const responses = ["Order is out for delivery, it would reach within 20 minutes",
"Your order is being prepared , have paitence for a while, it would reach in 30 minutes",
"Your order will be ready in 15 minutes"];

let response = responses[Math.floor(Math.random() * responses.length)];

app.set('view engine', 'ejs')

app.get('/', (_req, res) => {
  res.render('pages/index')
})

app.post('/', (req, res) => {
  dashaCall(req.body.phone)
  res.json({ success: true })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))

async function dashaCall(phone) {
  const app = await dasha.deploy("./app");

  app.connectionProvider = async (conv) =>
    conv.input.phone === "chat"
      ? dasha.chat.connect(await dasha.chat.createConsoleChat())
      : dasha.sip.connect(new dasha.sip.Endpoint("default"));

  app.ttsDispatcher = () => "dasha";

  app.setExternal('function1', (args) => {
    console.log(args.log)
  })

  await app.start();

  const conv = app.createConversation({ phone: phone,res: response });
  if (conv.input.phone !== 'chat') conv.on('transcription', console.log)

  const result = await conv.execute()

  console.log(result.output)

  await app.stop()
  app.dispose()
}
