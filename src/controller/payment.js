const { modelAllPayment } = require('../model/payment')
const { success, failed, notFound } = require('../helper/response')
const { response } = require('express')

module.exports = {
    getAllPayment: (req, res) => {
        try{
            modelAllPayment().then((response) => {
                if(response.length > 0){
                    success(res, response, {}, 'Get all payment success')
                }else{
                    notFound(res,"Data unavailable", response)
                }
            }).catch((err) => {
                failed(res, 'Internal server error', err)
            })
        }catch(error){
            failed(res, 'Internal server error', error)
        }
    }
}