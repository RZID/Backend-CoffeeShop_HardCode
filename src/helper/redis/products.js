const client = require('../../config/redis')
const _ = require('lodash')
const { success, failed, notFound } = require('../response')

module.exports = {
    getAllProductsRedis: (req, res, next) => {
        client.get('redisProducts', (err, result) => {
            if(err){
                failed(res, 'Internal server error', [])
            }else{
                if(result){
                    const response = JSON.parse(result)
                    const searchParams = req.query.searchParams ? req.query.searchParams : 'name'
                    const search = req.query.search ? req.query.search : ''
                    const param = req.query.param ? req.query.param : 'id'
                    const sort = req.query.sort ? req.query.sort : 'asc'
                    const limit = req.query.limit ? Number(req.query.limit) : 12
                    const page = req.query.page ? Number(req.query.page) : 1
                    const offset = page===1 ? 0 : (page-1)*limit
                    const filterData = _.filter(response, (item) => {
                        return item[searchParams].toString().toLowerCase().includes(search.toString().toLowerCase())
                    })
                    if(filterData.length >= 1){
                        const sortData = _.orderBy(filterData, param, sort)
                        const paginationData = _.slice(sortData, offset, offset+limit)
                        const pagination = {
                            page: page,
                            limit: limit,
                            totalData: filterData.length,
                            totalPage: Math.ceil(filterData.length / limit)
                        }
                        success(res, paginationData, pagination, 'Get all products from redis success')
                    }else{
                        notFound(res,"Data unavailable", {})
                    }
                }else{
                    next()
                }
            }
        })
    }
}