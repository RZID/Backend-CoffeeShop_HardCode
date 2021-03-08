const connection = require('../config/mysql')

module.exports = {
    modelProductsRedis: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT products.id as id, productName as name, products.productCategory as id_category,
            size, category.name as category,
            price, image, description, stock, delivery.name as delivery, UNIX_TIMESTAMP(created_at) AS time 
            FROM products
            LEFT JOIN category ON products.productCategory = category.id
            LEFT JOIN product_size ON products.productSize = product_size.id
            LEFT JOIN delivery ON products.delivery = delivery.id`
                , (err, result) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    modelAllProducts: (searchParams, search, param, sort, offset, limit) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT products.id as id, productName as name, products.productCategory as id_category,
            size, category.name as category,
            price, image, description, stock, delivery.name as delivery, UNIX_TIMESTAMP(created_at) AS time 
            FROM products
            LEFT JOIN category ON products.productCategory = category.id
            LEFT JOIN product_size ON products.productSize = product_size.id
            LEFT JOIN delivery ON products.delivery = delivery.id
            WHERE ${searchParams} LIKE '%${search}%' ORDER BY ${param} ${sort}
            LIMIT ${offset}, ${limit}
            `, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    modelTotalProducts: (searchParams, search) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(*) as total FROM products WHERE ${searchParams} LIKE '%${search}%'`
                , (err, result) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    modelDetailProduct: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT products.id as id, productSize, productCategory, delivery as productDelivery, productName as name, size, category.name as category,
            price, image, description, stock, delivery.name as delivery, UNIX_TIMESTAMP(created_at) AS time 
            FROM products
            LEFT JOIN category ON products.productCategory = category.id
            LEFT JOIN product_size ON products.productSize = product_size.id
            LEFT JOIN delivery ON products.delivery = delivery.id
            WHERE products.id = '${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    modelInsertProduct: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO products (productName, productSize, productCategory, price, image, description, stock, delivery)
            VALUES ( '${data.productName}', '${data.productSize}', '${data.productCategory}',
            '${data.price}', '${data.image}', '${data.description}', '${data.stock}', '${data.delivery}' ) `
                , (err, result) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    modelUpdateProduct: (data, id) => {
        return new Promise((resolve, reject) => {
            connection
                .query(`UPDATE products 
            SET productName = '${data.productName}', productSize = '${data.productSize}', productCategory = '${data.productCategory}', 
            price = '${data.price}', image = '${data.image}', description = '${data.description}', stock = '${data.stock}', delivery = '${data.delivery}'
            WHERE products.id = '${id}'`
                    , (err, result) => {
                        if (err) {
                            reject(new Error(err))
                        } else {
                            resolve(result)
                        }
                    })
        })
    },
    modelUpdateProductPatch: (data, id) => {
        return new Promise((resolve, reject) => {
            connection
                .query(`UPDATE products 
            SET ? WHERE products.id = ?`, [data, id]
                    , (err, result) => {
                        if (err) {
                            reject(new Error(err))
                        } else {
                            resolve(result)
                        }
                    })
        })
    },
    modelDeleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            connection
                .query(`DELETE FROM products WHERE products.id = '${id}'`
                    , (err, result) => {
                        if (err) {
                            reject(new Error(err))
                        } else {
                            resolve(result)
                        }
                    })
        })
    }
}