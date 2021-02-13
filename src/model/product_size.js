const connection = require('../config/mysql')

module.exports = {
    modelAllProductSize: () => {
        return new Promise ((resolve, reject) => {
            connection.query(`SELECT * FROM product_size
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