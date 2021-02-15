const {
    modelAllProducts,
    modelTotalProducts,
    modelDetailProduct,
    modelInsertProduct,
    modelUpdateProduct,
    modelUpdateProductPatch,
    modelDeleteProduct,
    modelProductsRedis,
} = require('../model/products')

const { success, failed, notFound } = require('../helper/response')
const redisClient = require('../config/redis')
const fs = require('fs')

module.exports = {
    setDataRedis: () => {
        modelProductsRedis().then((response) => {
            const data = JSON.stringify(response)
            redisClient.set('redisProducts', data)
        }).catch((err) => {
            failed(res, 'Internal server error', [])
        })
    },
    getAllProducts: async (req, res) => {
        try {
            let searchParams = req.query.searchParams ? req.query.searchParams : 'productName'
            if (searchParams === 'id_category') {
                searchParams = 'products.productCategory'
            }
            const search = req.query.search ? req.query.search : ''
            const param = req.query.param ? req.query.param : 'id'
            const sort = req.query.sort ? req.query.sort : 'ASC'
            const limit = req.query.limit ? req.query.limit : 12
            const page = req.query.page ? req.query.page : 1
            const offset = page === 1 ? 0 : (page - 1) * limit
            const responseTotal = await modelTotalProducts(searchParams, search)

            modelAllProducts(searchParams, search, param, sort, offset, limit).then((response) => {
                const data = response
                const pagination = {
                    page: page,
                    limit: limit,
                    totalData: responseTotal[0].total,
                    totalPage: Math.ceil(responseTotal[0].total / limit)
                }
                if (response.length > 0) {
                    module.exports.setDataRedis()
                    success(res, data, pagination, 'Get all products from database success')
                } else {
                    notFound(res, "Data unavailable", data)
                }
            }).catch((err) => {
                failed(res, 'Internal server error', err.message)
            })
        } catch (error) {
            failed(res, 'Internal server error', error.message)
        }
    },
    getDetailProduct: (req, res) => {
        try {
            const id = req.params.id

            modelDetailProduct(id).then((response) => {
                if (response.length > 0) {
                    success(res, response, {}, 'Get detail product success')
                } else {
                    notFound(res, "Data unavailable", response)
                }
            }).catch((err) => {
                failed(res, 'Internal server error', err)
            })
        } catch (error) {
            failed(res, 'Internal server error', error)
        }
    },
    insertProduct: (req, res) => {
        try {
            const data = {
                productName: req.body.productName,
                productSize: req.body.productSize,
                productCategory: req.body.productCategory,
                price: req.body.price,
                image: req.file.filename,
                description: req.body.description,
                stock: req.body.stock,
                delivery: req.body.delivery
            }
            if (!data.productName || !data.productSize || !data.productCategory || !data.price || !data.image ||
                !data.description || !data.stock || !data.delivery) {
                const path = `./public/images/${data.image}`
                fs.unlinkSync(path)
                failed(res, 'All textfield is required!', [])
            } else {
                modelInsertProduct(data)
                    .then((response) => {
                        module.exports.setDataRedis()
                        success(res, response, {}, 'Insert product success')
                    }).catch((err) => {
                        failed(res, 'Internal server error', [])
                    })
            }
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    updateProduct: async (req, res) => {
        try {
            const body = req.body;
            const id = req.params.id
            const detail = await modelDetailProduct(id)
            // const data = {
            //     productName: req.body.productName,
            //     productSize: req.body.productSize,
            //     productCategory: req.body.productCategory,
            //     price: req.body.price,
            //     image: req.file.filename,
            //     description: req.body.description,
            //     stock: req.body.stock,
            //     delivery: req.body.delivery
            // }
            const data = { ...body, image: req.file.filename }
            if (!data.productName || !data.productSize || !data.productCategory || !data.price || !data.image ||
                !data.description || !data.stock || !data.delivery) {
                const path = `${process.cwd()}/public/images/${req.file.filename}`
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path)
                }
                failed(res, 'All textfield is required!', [])
            } else {
                modelUpdateProduct(data, id)
                    .then((response) => {
                        const path = `./public/images/${detail[0].image}`
                        fs.unlinkSync(path)
                        module.exports.setDataRedis()
                        success(res, response, {}, 'Update product success')
                    }).catch(() => {
                        failed(res, 'All textfield is required!', [])
                    })
            }
        } catch (error) {
            failed(res, 'All textfield is required!', [])
        }
    },
    updateProductPatch: async (req, res) => {
        try {
            const data = req.body
            const id = req.params.id
            const detail = await modelDetailProduct(id)
            if (req.file) {
                data.image = req.file.filename
                const path = `./public/images/${detail[0].image}`
                fs.unlinkSync(path)
            }
            modelUpdateProductPatch(data, id)
                .then((response) => {
                    module.exports.setDataRedis()
                    success(res, response, {}, 'Update product success')
                }).catch((err) => {
                    failed(res, 'Internal server error', [])
                })
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id
            const detail = await modelDetailProduct(id)

            modelDeleteProduct(id)
                .then((response) => {
                    if (response.affectedRows === 0) {
                        notFound(res, "Data unavailable", response)
                    } else {
                        const path = `./public/images/${detail[0].image}`
                        fs.unlinkSync(path)
                        module.exports.setDataRedis()
                        success(res, response, {}, 'Delete product success')
                    }
                }).catch((err) => {
                    failed(res, 'Internal server error', [])
                })
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    }
}