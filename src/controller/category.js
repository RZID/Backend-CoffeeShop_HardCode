const { modelAllCategory } = require('../model/category')
const { success, failed, notFound } = require('../helper/response')

module.exports = {
    allCategory: (req, res) => {
        try{
            modelAllCategory().then((response) => {
                if(response.length > 0){
                    success(res, response, {}, 'Get all category success')
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