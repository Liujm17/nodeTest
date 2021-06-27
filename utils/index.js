const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('./constant')

function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]'
  }

  //破解
  function decoded(req) {
    let token = req.get('Authorization')
    if (token.indexOf('Bearer') === 0) {
      token = token.replace('Bearer ', '')
    }
    return jwt.verify(token, PRIVATE_KEY)
  }

  module.exports = {
    isObject,
    decoded
  }
  