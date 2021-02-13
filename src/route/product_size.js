const express = require('express')
const routeProductSize = express.Router()
const{ allProductSize } = require('../controller/product_size')
const { authentication, adminAuthorization, userAuthorization } = require('../helper/middleware/auth')

routeProductSize
    .get('/api/productsize', authentication, allProductSize)

module.exports = routeProductSize