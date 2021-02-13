const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const { modelReg,
    modelCheck,
    modelUpdate,
    modelDetail } = require('../model/users');

const { failed,
    success,
    notFound } = require('../helper/response');

module.exports = {
    //user login
    login: (req, res) => {
        const body = req.body;
        modelCheck(body.email).then(async (response) => {
            if (response.length === 1) {
                const checkPassword = await bcrypt.compare(body.password, response[0].password);
                if (checkPassword) {
                    const userData = {
                        id: response[0].id,
                        email: response[0].email,
                        access: response[0].access,
                        display_name: response[0].display_name
                    };
                    const token = jwt.sign(userData, process.env.JWT_SECRET);
                    success(res, { token, display_name: userData.display_name, id: response[0].id, access: userData.access }, {}, 'Login Success')
                } else {
                    failed(res, "Wrong Password", {})
                }
            } else {
                failed(res, "Email hasn't been registered", {})
            }
        }).catch((err) => {
            failed(res, "Server Error", {})
        })
    },
    //user register
    userReg: (req, res) => {
        const body = req.body;
        const name = body.email.match(/^([^@]*)@/)[1];
        const data = {
            email: body.email,
            password: body.password,
            phone: body.phone,
            display_name: name,
            image: 'default_photo.png',
            access: body.access ? body.access : '1'
        }
        modelCheck(body.email).then(async (response) => {
            if (response.length >= 1) {
                console.log(data.access)
                failed(res, "Email has been registered", {})
            } else {
                if (!body.email || !body.phone || !body.password) {
                    failed(res, 'Empty Field, All Field Required', {})
                } else {
                    const salt = await bcrypt.genSalt();
                    const password = await bcrypt.hash(body.password, salt);
                    const user = {
                        email: data.email,
                        phone: data.phone,
                        access: data.access,
                        display_name: data.display_name,
                        image: data.image,
                        password
                    };
                    modelReg(user).then((response) => {
                        success(res, user, {}, 'Register Success')
                    }).catch((err) => {
                        failed(res, "Server Error", {})
                    });
                }
            }
        }).catch((err) => {
            failed(res, "Server Error, Check email", {})
        })
    },
    //update User
    updateUser: async (req, res) => {
        try {
            const body = req.body;
            const id = req.params.id
            const detail = await modelDetail(id)
            // const data = {...body, image: req.file.filename};
            if (req.file) {
                const data = { ...body, image: req.file.filename };
                if (detail[0].image === 'default_photo.png') {
                    modelUpdate(data, id)
                        .then((response) => {
                            success(res, response, {}, 'Update User success')
                        }).catch((err) => {
                            failed(res, 'All textfield is required!', [])
                        })
                } else {
                    const path = `./public/images/${detail[0].image}`
                    fs.unlinkSync(path)
                    modelUpdate(data, id)
                        .then((response) => {
                            success(res, response, {}, 'Update User success')
                        }).catch(() => {
                            failed(res, 'Can\'t connect to database', [])
                        })
                }
            } else {
                const data = { ...body, image: 'default_photo.png' };
                if (detail[0].image === 'default_photo.png') {
                    modelUpdate(data, id)
                        .then((response) => {
                            success(res, response, {}, 'Update User success')
                        }).catch((err) => {
                            failed(res, 'All textfield is required!', [])
                        })
                } else {
                    const path = `./public/images/${detail[0].image}`
                    fs.unlinkSync(path)
                    modelUpdate(data, id)
                        .then((response) => {
                            success(res, response, {}, 'Update User success')
                        }).catch(() => {
                            failed(res, 'Can\'t connect to database', [])
                        })
                }
            }
        } catch (error) {
            failed(res, 'Error server', [])
        }
    },
    //get Detail User
    getDetailUser: (req, res) => {
        try {
            const id = req.params.id
            modelDetail(id).then((response) => {
                if (response.length > 0) {
                    success(res, response, {}, 'Get detail user success')
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
}