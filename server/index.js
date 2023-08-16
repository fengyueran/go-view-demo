const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const ffi = require('ffi-napi')
const path = require('path')

const libPath = path.join(__dirname, 'math.dylib')

global.mathDLL = ffi.Library(libPath, {
  Add: ['double', ['double', 'double']]
})

const random = (m, n) => Math.ceil(Math.random() * (n - m)) + m

app.get('/dataset', (req, res) => {
  res.send({ data: { voltage: random(10, 70), soc: random(0, 100) } })
})

const delay = async () => {
  const fn = new Promise(reslove => {
    setTimeout(() => {
      console.log('Start execute script')
      // const res = mathDLL.Add(333, 333);
      // reslove(res);
    }, 3000)
  })
  const value = await fn()
  return value
}

function generateBaseFunc(fnStr) {
  try {
    return new Function(`
      return (
        async function(){
          ${fnStr}
        }
      )`)()
  } catch (error) {
    console.error(error)
  }
}

app.post('/execute', async (req, res) => {
  console.log(req.body)
  const { code } = req.body

  const fn = generateBaseFunc(code)
  const result = await fn()
  console.log('result', result)
  res.send({ data: result })
})

app.listen(8080, () => console.log('listening on port 8080'))
