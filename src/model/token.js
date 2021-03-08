const connection = require('../config/mysql')
module.exports = {
    addToken: (token, email) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO token_user (email_token,token) VALUES (?,?)', [email, token], (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(true)
                }
            })
        })
    },
    getToken: (token) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM token_user WHERE token = ?', [token], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    activate: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET is_active = 1 WHERE email = ?', [email], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    delete_token: (token) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM token_user WHERE token = ?', [token], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}