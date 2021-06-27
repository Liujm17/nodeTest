const express = require('express')
const {login,add,maxId,del,update,findUserInfo,findTest} = require('../services/user')
const jwt = require('jsonwebtoken')
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')
// const {insert} = require('../db')
//注册路由
const router = express.Router()

router.get('/info', function(req, res, next) {
  res.json('user info...')
})

//登陆
router.post('/login', function(req, res, next) {
  let { username, password } = req.body
  login(username, password).then(user=>{
    if (!user || user.length === 0) {
      res.json({
        code: -1,
        msg: '登陆失败'
      })
    } else {
      const token = jwt.sign(
        { username },
        PRIVATE_KEY,
        { expiresIn: JWT_EXPIRED }
      )
      res.json({
        code: 0,
        msg: '登陆成功',
        token
      })
    }
    })
   
  })

  //查询测试，多表
  router.get('/infoTest',function(req,res,next){
    findTest().then(backInfo=>{
      res.json({
        code: 0,
        msg: '提交成功',
        data:{
          username:backInfo[0].username,
          password:backInfo[0].password,
          remark:backInfo[1].remark,
        }
      })
    })
  })

    //查询信息
    router.get('/getInfo',function(req,res,next){
      findUserInfo(req.query.username,'admin_user').then(backInfo=>{
        res.json({
          code: 0,
          msg: '提交成功',
          data:backInfo
        })
      })
    })

  //新增
  router.post('/add',function(req,res,next){
    add(req.body,'admin_user').then(backInfo=>{
      console.log(backInfo)
      res.json({
        code: 0,
        msg: '提交成功',
      })
    })
  })

  //编辑
  router.post('/update',function(req,res,next){
    update(req.body,'admin_user',req.body.id).then(backInfo=>{
      console.log(backInfo)
      res.json({
        code: 0,
        msg: '提交成功',
      })
    })
  })

   //删除
   router.post('/del',function(req,res,next){
    del(req.body.id,'admin_user').then(backInfo=>{
      console.log(backInfo)
      res.json({
        code: 0,
        msg: '提交成功',
      })
    })
  })


module.exports = router