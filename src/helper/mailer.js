const mailjet = require('node-mailjet')
    .connect(`${process.env.token_mail1}`, `${process.env.token_mail2}`)
module.exports = {
    register: (mail, username, secret) => {
        const mailer = mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": process.env.email_from,
                            "Name": "Admin HCCoffee"
                        },
                        "To": [
                            {
                                "Email": mail,
                                "Name": username
                            }
                        ],
                        "Subject": "Verify your account! - HCCoffee",
                        "HTMLPart": `<h4>Hello, ${username}!</h4><p>To verify your account, please click : </p><p><a href="${process.env.frontend}/verify/${secret}">This Link</a></p>`,
                        "CustomID": "AppGettingStartedTest"
                    }
                ]
            })
        return new Promise((resolve, reject) => {

            mailer.then((res) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })

        })
    }
}
