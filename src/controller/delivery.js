const { modelAllDelivery } = require('../model/delivery')
const { success, failed, notFound } = require('../helper/response')

module.exports = {
    allDelivery: (req, res) => {
        try{
            modelAllDelivery().then((response) => {
                if(response.length > 0){
                    success(res, response, {}, 'Get all delivery success')
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