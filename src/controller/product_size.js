const { modelAllProductSize } = require('../model/product_size')
const { success, failed, notFound } = require('../helper/response')

module.exports = {
    allProductSize: (req, res) => {
        try{
            modelAllProductSize().then((response) => {
                if(response.length > 0){
                    success(res, response, {}, 'Get all product size success')
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