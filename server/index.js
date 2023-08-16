const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const random = (m, n) => Math.ceil(Math.random() * (n - m)) + m

app.get('/dataset', (req, res) => {
  res.send({ data: { voltage: random(10, 70), soc: random(0, 100) } })
})

app.post('/execute', (req, res) => {
  console.log(req.body)
  const { code } = req.body
  // const a = eval(code);
  const result = new Function(code)()
  res.send({ data: { voltage: random(10, 70), soc: random(0, 100) } })
})

app.listen(8080, () => console.log('listening on port 8080'))
