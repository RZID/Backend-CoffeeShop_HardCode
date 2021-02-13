const connection = require('../config/mysql')

module.exports = {
    modelAllDelivery: () => {
        return new Promise ((resolve, reject) => {
            connection.query(`SELECT * FROM delivery
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