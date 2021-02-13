const connection = require('../config/mysql')

module.exports = {
    modelAllHistory: (searchParams, search, param, sort, offset, limit) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT history.id AS id, productName as name, price, image, qty, delivery_detail , status, UNIX_TIMESTAMP(history.created_at) AS time
            FROM history
            LEFT JOIN products ON history.id_product = products.id
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
    modelTotalHistory: (searchParams, search) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(*) as total FROM history WHERE ${searchParams} LIKE '%${search}%'`
                , (err, result) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    modelDetailHistory: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT history.id AS id, productName as name, price, image, qty, delivery_detail, status, UNIX_TIMESTAMP(history.created_at) AS time
            FROM history
            LEFT JOIN products ON history.id_product = products.id
            WHERE history.id = '${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    modelInsertHistory: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO history (id_product, id_user, qty, delivery_detail, status, address, phone, payment)
            VALUES ( ?,?,?,?,?,?,?,? ) `, [data.id_product, data.id_user, data.qty, data.delivery_detail, data.status, data.address, data.phone, data.payment]
                , (err, result) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    modelPatchHistory: (data, id) => {
        return new Promise((resolve, reject) => {
            connection
                .query(`UPDATE history 
            SET ? WHERE history.id = ?`, [data, id]
                    , (err, result) => {
                        if (err) {
                            reject(new Error(err))
                        } else {
                            resolve(result)
                        }
                    })
        })
    },
    modelDeleteHistory: (id) => {
        return new Promise((resolve, reject) => {
            connection
                .query(`DELETE FROM history WHERE id = '${id}'`
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