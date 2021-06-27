const express = require('express')
const router = require('./router')
// 创建 express 应用
const app = express()
//这里我们通过 req.body 获取 POST 请求中的参数，但是没有获取成功，我们需要通过 body-parser 中间件来解决这个问题：
// const bodyParser = require('body-parser')
const cors = require('cors')

//bodyParser已被弃用了，直接express里就一定要前置
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())

//将路径全部封装到router
app.use('/',router)
app.use(cors())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())


// 使 express 监听 8000 端口号发起的 http 请求
const server = app.listen(8000, function() {
  const { address, port } = server.address()
  console.log('Http Server is running on http://%s:%s', address, port)
})