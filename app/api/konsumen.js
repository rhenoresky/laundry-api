const User = require('../models').User
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    async signup(req, res) {
        try {
            if (!req.body.username) {
                res.status(400).send({
                    message: "Error",
                    error: "Username Tidak Boleh Kosong"
                });
                return;
            }
            if (!req.body.name) {
                res.status(400).send({
                    message: "Error",
                    error: "Name Tidak Boleh Kosong"
                });
                return;
            }
            if (!req.body.email) {
                res.status(400).send({
                    message: "Error",
                    error: "Email Tidak Boleh Kosong"
                });
                return;
            }
            if (!req.body.password) {
                res.status(400).send({
                    message: "Error",
                    error: "Password Tidak Boleh Kosong"
                });
                return;
            }

            const username = await User.findOne({
                where: {
                    username: req.body.username
                }
            })
            if (username) {
                res.status(400).send({
                    message: "Error",
                    error: "Username Sudah Dipakai!"
                });
                return;
            }
    
            const email = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (email) {
                res.status(400).send({
                    message: "Error",
                    error: "Email Sudah Dipakai!"
                });
                return;
            }

            await User.create({
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8)
            })
            res.status(200).send({
                message: "User Berhasil Dibuat!",
                error: null
            })

        } catch (err) {
            console.error(err)
            res.status(500).send({
                message: "Gagal Membuat User",
                error: "Server Error"
            })
        }
    },

    async signin(req, res) {
        try {
            if (!req.body.username) {
                res.status(400).send({
                    message: "Error",
                    error: "Username Kosong"
                });
                return;
            }
            if (!req.body.password) {
                res.status(400).send({
                    message: "Error",
                    error: "password Kosong"
                });
                return;
            }
    
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            })
            if (!user) {
                res.status(400).send({
                    accessToken: null,
                    message: "Error",
                    error: "User Tidak Ditemukan."
                });
                return;
            }

            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
            if (!passwordIsValid) {
                res.status(400).send({
                    accessToken: null,
                    message: "Error",
                    error: "Password Salah!"
                });
                return
            }

            require('dotenv').config()
            let token = 'Bearer ' + jwt.sign({
                username: user.username
            }, process.env.RAHASIA, {
                expiresIn: 86400
            })
            res.status(200).send({
                accessToken: token,
                message: "Signin Berhasil",
                error: null
            });

        } catch (err) {
            console.log(err)
            res.status(500).send({
                message: "Signin Gagal",
                error: "Server Error"
            })
        }
    },

    async profileUpdate(req, res) {
        const profil = await User.findOne({
            where: {
                username: req.username
            }
        })
        if (!profil) {
            res.status(400).send({
                message: "Error",
                error: "User Tidak Ditemukan"
            })
            return
        }
        if (!req.body.username) {
            res.status(400).send({
                message: "Error",
                error: "Username Tidak Boleh Kosong"
            });
            return;
        }
        if (!req.body.name) {
            res.status(400).send({
                message: "Error",
                error: "Name Tidak Boleh Kosong"
            });
            return;
        }
        if (!req.body.email) {
            res.status(400).send({
                message: "Error",
                error: "Email Tidak Boleh Kosong"
            });
            return;
        }
        if (!req.body.password) {
            res.status(400).send({
                message: "Error",
                error: "Password Tidak Boleh Kosong"
            });
            return;
        }

        profil.username = req.body.username
        profil.name = req.body.name
        profil.email = req.body.email
        profil.password = bcrypt.hashSync(req.body.password, 8)
        await profil.save()
        
        res.status(200).send({
            message: "Berhasil Diperbarui",
            error: null
        });
    },

    async getUser(req, res) {
        const user = await User.findOne({
            where: {
                username: req.username
            }
        })
        if (!user) {
            res.status(400).send({
                message: "Error",
                error: "User Tidak Ditemukan"
            })
            return;
        }
        res.status(200).send(user)
    },

    async deleteUser(req, res) {
        const user = await User.findOne({
            where: {
                username: req.username
            }
        })
        if (!user) {
            res.status(400).send({
                message: "Error",
                error: "User Tidak Ditemukan"
            })
            return;
        }
        user.destroy()
        res.status(200).send({
            message: 'User Berhasil Dihapus',
            error: null
        })
    }
}