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

//删除
function del(id,tableName){
  return deleteSql(id,tableName)
}

//编辑
function update(values,tableName,id){
  return updateSql(values,tableName,`where id='${id}'`)
}
  module.exports = {
    findInfo,add,del,update
  }