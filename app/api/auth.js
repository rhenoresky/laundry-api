const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken(req, res, next) {
        let tokenHeader = req.headers['laundry-token']

        if (!tokenHeader) {
            res.status(400).send({
                message: "Error",
                error: "Token Tidak Ditemukan"
            })
            return;
        }

        if (tokenHeader.split(' ')[0] !== 'Bearer') {
            res.status(400).send({
                message: "Error",
                error: "Format Token Salah"
            });
            return;
        }

        let token = tokenHeader.split(' ')[1]

        if (!token) {
            return res.status(400).send({
                message: "Error",
                error: "Token Tidak Ada"
            });
        }

        require('dotenv').config()
        jwt.verify(token, process.env.RAHASIA, (err, decoded) => {
            if (err) {
                res.status(500).send({
                    message: "Error",
                    error: err
                });
                return;
            }
            req.username = decoded.username;
            next();
        })
    }
}