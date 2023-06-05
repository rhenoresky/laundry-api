const Pencucian = require('../models').Pencucian
const User = require('../models').User
const Mesin = require('../models').Mesin

module.exports = {
    async order(req, res) {
        const user = await User.findOne({
            where: {
                username: req.username
            }
        })

        if (!user) {
            res.status(400).send({
                message: "Error",
                errors: "User Tidak Ditemukan"
            });
            return;
        }

        const mesin = await Mesin.findOne({
            where: {
                name: req.body.mesin
            }
        })

        if (!mesin) {
            res.status(400).send({
                message: "Error",
                errors: "Mesin Tidak Ditemukan"
            });
            return;
        }

        const pencucian = await Pencucian.create({
            kode: Date.now(),
            berat: req.body.berat
        })

        await pencucian.setUser(user)
        await pencucian.setMesin(mesin)

        res.status(200).send({
            message: "Berhasil Membuat Pesanan Pencucian!",
            error: null,
        });
    },

    async getOrderByUser(req, res) {
        const user = await User.findOne({
            where: {
                username: req.username
            }
        })
        if (!user) {
            res.status(400).send({
                message: "Error",
                errors: "User Tidak Ditemukan"
            });
            return;
        }

        const pencucian = await user.getPencucians({
            include: [
                {
                    model: User
                },
                {
                    model: Mesin
                }
            ]
        })
        if (!pencucian) {
            res.status(500).send({
                message: "Error",
                errors: "Server Error"
            });
            return;
        }
        if (pencucian.length <= 0) {
            res.status(200).send({
                message: 'Pencucian null'
            })
            return
        }
        res.status(200).send(pencucian)
    },

    async getOrderByMesin(req, res) {
        const mesin = await Mesin.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!mesin) {
            res.status(400).send({
                message: "Error",
                errors: "Mesin Tidak Ditemukan"
            });
            return;
        }

        const pencucian = await mesin.getPencucians({
            include: [
                {
                    model: User
                },
                {
                    model: Mesin
                }
            ]
        })
        if (!pencucian) {
            res.status(500).send({
                message: "Error",
                errors: "Server Error"
            });
            return;
        }
        if (pencucian.length <= 0) {
            res.status(200).send({
                message: 'Pencucian null'
            })
            return
        }
        res.status(200).send(pencucian)
    },

    async getOrderById(req, res) {
        // const user = await User.findOne({
        //     where: {
        //         username: req.params.username
        //     }
        // })
        // if (!user) {
        //     res.status(400).send({
        //         message: "Error",
        //         errors: "User Tidak Ditemukan"
        //     });
        //     return;
        // }

        // const pencucians = await user.getPencucians({
        //     include: [
        //         {
        //             model: User
        //         },
        //         {
        //             model: Mesin
        //         }
        //     ]
        // })

        const pencucian = await Pencucian.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User
                },
                {
                    model: Mesin
                }
            ]
        })

        if (!pencucian) {
            res.status(400).send({
                message: "Error",
                errors: "Order Tidak Ada"
            });
            return;
        }

        // const pencucian = pencucians[req.params.id]
        res.status(200).send(pencucian)
    },

    async updateOrder(req, res) {
        const pencucian = await Pencucian.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!pencucian) {
            res.status(400).send({
                message: "Error",
                errors: "Order Tidak Ditemukan"
            });
            return;
        }

        pencucian.berat = req.body.berat
        await pencucian.save()

        if (req.body.mesin) {
            const mesin = await Mesin.findOne({
                where: {
                    name: req.body.mesin
                }
            })
            if (!mesin) {
                res.status(400).send({
                    message: "Error",
                    errors: "Mesin Tidak Ditemukan"
                });
                return;
            }

            await pencucian.setMesin(mesin)
        }
        res.status(200).send({
            message: "Update Order Sukses",
            errors: null
        })
    },

    async deleteOrder(req, res) {
        // const user = await User.findOne({
        //     where: {
        //         username: req.params.username
        //     }
        // })
        // if (!user) {
        //     res.status(400).send({
        //         message: "Error",
        //         errors: "User Tidak Ditemukan"
        //     });
        //     return;
        // }

        // const pencucians = await user.getPencucians({
        //     include: [
        //         {
        //             model: User
        //         },
        //         {
        //             model: Mesin
        //         }
        //     ]
        // })

        const pencucian = await Pencucian.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!pencucian) {
            res.status(400).send({
                message: "Error",
                errors: "Order Tidak Ditemukan"
            })
        }

        // const pencucian = pencucians[req.params.id]
        pencucian.destroy()
        res.status(200).send({
            message: 'Order Berhasil Dihapus',
            error: null
        })
    },

    async getOrderAll(req, res) {
        const pencucian = await Pencucian.findAll({
            include: [
                {
                    model: User
                },
                {
                    model: Mesin
                }
            ]
        })
        if (!pencucian) {
            res.status(500).send({
                message: "Error",
                errors: "Server Error"
            });
            return;
        }
        if (pencucian.length <= 0) {
            res.status(200).send({
                message: 'Pencucian null'
            })
            return
        }
        res.status(200).send(pencucian)
    }
}