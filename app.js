const express = require('express')
const router = require('./router')
//获取本地ip，node自带的os模块
const os = require('os')
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

///获取本机ip///
function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
      var iface = interfaces[devName];
      for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address;
          }
      }
  }
}

// 使 express 监听 8000 端口号发起的 http 请求
const server = app.listen(8000, function() {
  const { port } = server.address()
  //address为::，不存在呀 所以用os的获取ip,即getIPAdress()方法
  // const { address, port } = server.address()
  console.log('Http Server is running on http://%s:%s', getIPAdress(), port)
})