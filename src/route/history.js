const express = require('express')
const routeHistory = express.Router()
const {
    getAllHistory,
    getDetailHistory,
    insertHistory,
    patchHistory,
    deleteHistory,
    getHistory
} = require('../controller/history')
const { authentication, adminAuthorization, userAuthorization } = require('../helper/middleware/auth')

routeHistory
    .get('/api/history', authentication, getAllHistory)                     // admin & user
    .get('/api/history/:id', authentication, getHistory)                     // admin & user
    .get('/api/detailHistory/:id', authentication, getDetailHistory)              // admin & user
    .post('/api/history', authentication, insertHistory)             // user & admin
    .patch('/api/history/:id', authentication, adminAuthorization, patchHistory)                // patch admin
    .delete('/api/history/:id', authentication, deleteHistory)                     // user


module.exports = routeHistory