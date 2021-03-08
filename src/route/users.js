const express = require('express');

const { userReg,
  login,
  updateUser,
  getDetailUser,
  activateUser,
  deletePhoto } = require('../controller/users');

const { authentication } = require('../helper/middleware/auth')

const singleUpload = require('../helper/middleware/upload')

const Router = express.Router()

Router
  .post('/api/register', userReg) //all access
  .post('/api/login', login)  //all access
  .patch('/api/user/:id', authentication, singleUpload, updateUser) //all acess
  .get('/api/user/:id', authentication, getDetailUser) //all access
  .get('/api/verify/:jwt', activateUser)
  .get('/api/user/delete_photo/:id', authentication, deletePhoto)

module.exports = Router