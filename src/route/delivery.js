const express = require('express')
const routeDelivery = express.Router()
const{ allDelivery } = require('../controller/delivery')
const { authentication, adminAuthorization, userAuthorization } = require('../helper/middleware/auth')

routeDelivery
    .get('/api/delivery', authentication, allDelivery)

module.exports = routeDelivery