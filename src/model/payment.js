const { reject } = require('lodash')
const connection = require('../config/mysql')

module.exports = {
    modelAllPayment: () => {
        return new Promise ((resolve, reject) => {
            connection.query(`SELECT * FROM payment
            `,(err, result) => {
                if (err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}