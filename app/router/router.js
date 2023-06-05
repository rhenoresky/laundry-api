const { createMesin, updateMesin, deleteMesin, getMesin } = require("../api/alat")
const { verifyToken } = require("../api/auth")
const { signup, signin, profileUpdate, deleteUser, getUser } = require("../api/konsumen")
const { order, getOrderById, updateOrder, deleteOrder, getOrderByUser, getOrderByMesin, getOrderAll } = require("../api/proses")

module.exports = function (app) {
    // user
    app.get('/user', verifyToken, getUser)
    app.post('/signup', signup)
    app.post('/signin', signin)
    app.put('/user', verifyToken, profileUpdate)
    app.delete('/user', verifyToken, deleteUser)
    app.get('/user/pencucian', verifyToken, getOrderByUser)

    // pencucian
    app.post('/pencucian', verifyToken, order)
    app.get('/pencucian', verifyToken, getOrderAll)
    app.get('/pencucian/:id', verifyToken, getOrderById)
    app.put('/pencucian/:id', verifyToken, updateOrder)
    app.delete('/pencucian/:id', verifyToken, deleteOrder)

    // mesin
    app.post('/mesin', verifyToken, createMesin)
    app.get('/mesin/:id', verifyToken, getMesin)
    app.put('/mesin/:id', verifyToken, updateMesin)
    app.delete('/mesin/:id', verifyToken, deleteMesin)
    app.get('/mesin/pencucian/:id', verifyToken, getOrderByMesin)
}