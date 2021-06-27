const { querySql,insert,deleteSql,updateSql,queryOne } = require('../db')

//根据民宿名字查询或者查询全部
  function findInfo(tableName,username){
     if(username){
         return queryOne(`select * from ${tableName} where name='${username}'`)
     }else{
        return queryOne(`select * from ${tableName}`)
     }
  }
  
  // //查询全部
  // function findAllInfo(tableName){
  //   return queryOne(`select * from ${tableName}`)
  // }

  //新增
function add(values,tableName){
    return insert(values,tableName)
}

  module.exports = {
    findInfo,add
  }