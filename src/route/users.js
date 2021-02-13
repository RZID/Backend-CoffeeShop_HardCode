const express = require('express');

const { userReg,
  login,
  updateUser,
  getDetailUser } = require('../controller/users');

const { authentication, adminAuthorization, userAuthorization } = require('../helper/middleware/auth')

const singleUpload = require('../helper/middleware/upload')

const Router = express.Router()

Router
  .post('/api/register', userReg) //all access
  .post('/api/login', login)  //all access
  .patch('/api/user/:id', authentication, userAuthorization, singleUpload, updateUser) //user acess
  .get('/api/user/:id', authentication, getDetailUser) //all access

module.exports = Router