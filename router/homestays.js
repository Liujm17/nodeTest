const express = require('express')
const {
    findInfo,add,del,update
} = require('../services/homestays')
const jwt = require('jsonwebtoken')
const  Result = require('../models/Result')
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


//查询店铺信息，根据名字查询或者查询全部,分页使用slice截取，[firstNum,secondNum)
router.get('/getInfo', function (req, res, next) {
    findInfo('homestay',req.query.name ).then(backInfo => {
      if(backInfo&&req.query.pageNum&&req.query.pageSize){
        let firstNum=(Number(req.query.pageNum)-1)*Number(req.query.pageSize)
        let secondNum=(Number(req.query.pageNum)-1)*Number(req.query.pageSize)+Number(req.query.pageSize)
        res.json({
            code: 0,
            msg: '提交成功',
            data:{
                list:backInfo.slice(firstNum,secondNum),
                pageNum:Number(req.query.pageNum),
                pageSize:Number(req.query.pageSize),
                total:backInfo.length
            }
        })
      }else{
        new Result('信息查询失败').fail(res)
      }
    })
})

//查询店铺评论信息，根据店铺名字查询或者查询全部
router.get('/getRemarkInfo', function (req, res, next) {
    findInfo('detail',req.query.name ).then(backInfo => {
      if(backInfo&&req.query.pageNum&&req.query.pageSize){
        let firstNum=(Number(req.query.pageNum)-1)*Number(req.query.pageSize)
        let secondNum=(Number(req.query.pageNum)-1)*Number(req.query.pageSize)+Number(req.query.pageSize)
        res.json({
            code: 0,
            msg: '提交成功',
            data:{
                list:backInfo.slice(firstNum,secondNum),
                pageNum:Number(req.query.pageNum),
                pageSize:Number(req.query.pageSize),
                total:backInfo.length
            }
        })
      }else{
        new Result('信息查询失败').fail(res)
      }
    })
})

//新增店铺
router.post('/add',function(req,res,next){
    add(req.body,'homestay').then(backInfo=>{
      if(backInfo){
        res.json({
          code: 0,
          msg: '提交成功',
        })
      }else{
        new Result('新增失败').fail(res)
      }
      
    })
  })


//新增店铺评论
router.post('/addRemark',function(req,res,next){
    add(req.body,'detail').then(backInfo=>{
      if(backInfo){
        res.json({
          code: 0,
          msg: '提交成功',
        })
      }else{
        new Result('新增失败').fail(res)
      }
    })
  })

  //删除店铺
router.post('/del',function(req,res,next){
    del(req.body.id,'homestay').then(backInfo=>{
      if(backInfo){
        res.json({
          code: 0,
          msg: '提交成功',
        })
      }else{
        new Result('删除失败').fail(res)
      }
    })
  })

   //编辑店铺
router.post('/update',function(req,res,next){
    update(req.body,'homestay',req.body.id).then(backInfo=>{
      if(backInfo){
        res.json({
          code: 0,
          msg: '提交成功',
        })
      }else{
        new Result('编辑失败').fail(res)
      }
    })
  })
  

module.exports = router