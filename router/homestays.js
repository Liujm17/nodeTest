const express = require('express')
const {
    findInfo,add
} = require('../services/homestays')
const jwt = require('jsonwebtoken')
const {
    PWD_SALT,
    PRIVATE_KEY,
    JWT_EXPIRED
} = require('../utils/constant')
// const {insert} = require('../db')
//注册路由
const router = express.Router()

router.get('/info', function (req, res, next) {
    res.json('user info...')
})


//查询信息，根据名字查询或者查询全部,分页使用slice截取，[firstNum,secondNum)
router.get('/getInfo', function (req, res, next) {
    findInfo('homestay',req.query.name ).then(backInfo => {
        let firstNum=(Number(req.query.pageNum)-1)*Number(req.query.pageSize)
        let secondNum=(Number(req.query.pageNum)-1)*Number(req.query.pageSize)+Number(req.query.pageSize)
        res.json({
            code: 0,
            msg: '提交成功',
            data: backInfo.slice(firstNum,secondNum)
        })
    })
})

//新增
router.post('/add',function(req,res,next){
    add(req.body,'homestay').then(backInfo=>{
      console.log(backInfo)
      res.json({
        code: 0,
        msg: '提交成功',
      })
    })
  })


module.exports = router