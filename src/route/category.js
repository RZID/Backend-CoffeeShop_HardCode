const express = require('express')
const routeCategory = express.Router()
const{ allCategory } = require('../controller/category')
const { authentication, adminAuthorization, userAuthorization } = require('../helper/middleware/auth')

routeCategory
    .get('/api/category', authentication, allCategory)

module.exports = routeCategory