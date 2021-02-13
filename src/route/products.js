const express = require('express')
const routeProducts = express.Router()
const {
    getAllProducts,
    getDetailProduct,
    insertProduct,
    updateProduct,
    updateProductPatch,
    deleteProduct
} = require('../controller/products')
const { authentication, adminAuthorization, userAuthorization } = require('../helper/middleware/auth')
const { getAllProductsRedis } = require('../helper/redis/products')
const singleUpload = require('../helper/middleware/upload')

routeProducts
    .get('/api/products', authentication, getAllProductsRedis, getAllProducts)                          // admin & user
    .get('/api/product/:id', authentication, getDetailProduct)                                          // admin & user
    .post('/api/products', authentication, adminAuthorization, singleUpload, insertProduct)             // admin
    .put('/api/products/:id', authentication, adminAuthorization, singleUpload, updateProduct)          // admin
    .patch('/api/products/:id', authentication, adminAuthorization, singleUpload, updateProductPatch)   // admin
    .delete('/api/products/:id', authentication, adminAuthorization, deleteProduct)                     // admin


module.exports = routeProducts