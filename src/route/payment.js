const express = require('express')
const routePayment = express.Router()
const{
    getAllPayment
} = require('../controller/payment')
const { authentication, adminAuthorization, userAuthorization } = require('../helper/middleware/auth')

routePayment
    .get('/api/payment', authentication, getAllPayment)

module.exports = routePayment