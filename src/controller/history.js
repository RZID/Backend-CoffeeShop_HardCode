const {
    modelAllHistory,
    modelTotalHistory,
    modelDetailHistory,
    modelInsertHistory,
    modelPatchHistory,
    modelDeleteHistory,
    modelGetHistory,
    modelCountId
} = require('../model/history')

const { success, failed, notFound } = require('../helper/response')

module.exports = {
    getAllHistory: async (req, res) => {
        try {
            const searchParams = req.query.searchParams ? req.query.searchParams : 'history.id'
            const search = req.query.search ? req.query.search : ''
            const param = req.query.param ? req.query.param : 'history.id'
            const sort = req.query.sort ? req.query.sort : 'ASC'
            const limit = req.query.limit ? req.query.limit : 12
            const page = req.query.page ? req.query.page : 1
            const offset = page === 1 ? 0 : (page - 1) * limit
            const responseTotal = await modelTotalHistory(searchParams, search)

            modelAllHistory(searchParams, search, param, sort, offset, limit).then((response) => {
                const data = response
                const pagination = {
                    page: page,
                    limit: limit,
                    totalData: responseTotal[0].total,
                    totalPage: Math.ceil(responseTotal[0].total / limit)
                }
                if (response.length > 0) {
                    success(res, data, pagination, 'Get all history success')
                } else {
                    notFound(res, "Data unavailable", data)
                }
            }).catch((err) => {
                failed(res, 'Internal server error', err)
            })
        } catch (error) {
            failed(res, 'Internal server error', error)
        }
    },
    getDetailHistory: (req, res) => {
        try {
            const id = req.params.id

            modelDetailHistory(id).then((response) => {
                if (response.length > 0) {
                    success(res, response, {}, 'Get detail history success')
                } else {
                    notFound(res, "Data unavailable", response)
                }
            }).catch((err) => {
                failed(res, 'Internal server error', err)
            })
        } catch (error) {
            failed(res, 'Internal server error', error)
        }
    },
    insertHistory: (req, res) => {
        try {
            const body = req.body;
            const condition = true;

            const tesData = body.map((el) => {
                if (!el.id_product || !el.qty || !el.status || !el.delivery_detail || !el.id_user || !el.address || !el.phone || !el.payment) {
                    return !condition;
                } else {
                    return condition;
                }
            })
            const checkData = tesData.filter((el) => el === false);
            if (checkData.length >= 1) {
                failed(res, 'All textfield is required!', [])
            } else {
                const looping = new Promise((resolve, reject) => {
                    body.map((el) => {
                        const data = {
                            id_product: el.id_product,
                            qty: el.qty,
                            delivery_detail: el.delivery_detail,
                            status: el.status ? el.status : "0",
                            id_user: el.id_user,
                            address: el.address,
                            phone: el.phone,
                            payment: el.payment
                        }
                        modelInsertHistory(data)
                            .then((response) => {
                                resolve(response)
                            }).catch((err) => {
                                reject(err)
                            })
                    })
                })
                looping.then((response) => {
                    success(res, response, {}, 'Insert history success!')
                }).catch(err => {
                    failed(res, err.message, err)
                })
            }
        } catch (error) {
            failed(res, 'Internal server error', error)
        }
    },
    patchHistory: (req, res) => {
        try {
            const data = req.body
            const id = req.params.id

            modelPatchHistory(data, id)
                .then((response) => {
                    success(res, response, {}, 'Update history success')
                }).catch((err) => {
                    failed(res, 'Internal server error', [])
                })
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    deleteHistory: (req, res) => {
        try {
            const id = req.params.id

            modelDeleteHistory(id)
                .then((response) => {
                    if (response.affectedRows === 0) {
                        notFound(res, "Data unavailable", response)
                    } else {
                        success(res, response, {}, 'Delete history success')
                    }
                }).catch((err) => {
                    failed(res, 'Internal server error', err)
                })
        } catch (error) {
            failed(res, 'Internal server error', error)
        }
    },
    getHistory: async (req, res) => {
        const responseTotal = await modelCountId(req.params.id)
        modelGetHistory(req.params.id).then((response) => {
            const data = response
            if (response.length > 0) {
                success(res, data, responseTotal, 'Get history success')
            } else {
                notFound(res, "Data unavailable", data)
            }
        }).catch((err) => {
            failed(res, 'Internal server error', err.message)
        })
    }
}