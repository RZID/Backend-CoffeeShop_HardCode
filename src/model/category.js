const connection = require('../config/mysql')

module.exports = {
    modelAllCategory: () => {
        return new Promise ((resolve, reject) => {
            connection.query(`SELECT * FROM category
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