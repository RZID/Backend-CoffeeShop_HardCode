const express = require('express');

const { userReg,
  login,
  updateUser,
  getDetailUser,
  activateUser,
  deletePhoto } = require('../controller/users');

const { authentication, adminAuthorization, userAuthorization, verify } = require('../helper/middleware/auth')

const singleUpload = require('../helper/middleware/upload')

const Router = express.Router()

Router
  .post('/api/register', userReg) //all access
  .post('/api/login', login)  //all access
  .patch('/api/user/:id', authentication, userAuthorization, singleUpload, updateUser) //user acess
  .get('/api/user/:id', authentication, getDetailUser) //all access
  .get('/api/verify/:jwt', activateUser)
  .get('/api/user/delete_photo/:id', authentication, deletePhoto)

module.exports = Router