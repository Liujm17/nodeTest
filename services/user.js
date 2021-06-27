const { querySql,insert,deleteSql,updateSql,queryOne } = require('../db')

//登陆
function login(username, password) {
    return querySql(`select * from admin_user where username='${username}' and password = '${password}'`)
  }

  //根据用户名查询信息
  function findUserInfo(username,tableName){
    return queryOne(`select * from ${tableName} where username='${username}'`)
  }

//测试查询,多表查询
function findTest(){
  return Promise.all([queryOne(`select * from admin_user where username='ljm'`),queryOne(`select * from test where username='ljm'`)])
}



  //查询对应表格最大id
function maxId(tableName){
    return querySql(`SELECT max(id) from ${tableName}`)
}

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
    login,
    findUserInfo,
    add,
    maxId,
    del,
    update,
    findTest,
  }
  