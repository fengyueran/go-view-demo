const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const random = (m, n) => Math.ceil(Math.random() * (n - m)) + m

app.get('/get-data', (req, res) => {
  res.send({ data: { temperature: random(10, 70) } })
})

app.listen(8080, () => console.log('listening on port 8080'))
