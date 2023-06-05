const Mesin = require('../models').Mesin

module.exports = {
    async createMesin(req, res) {
        try {
            if (!req.body.nama) {
                res.status(400).send({
                    message: "Error",
                    error: "Nama Mesin Tidak Boleh Kosong"
                });
                return;
            }
            const mesin = await Mesin.findOne({
                where: {
                    name: req.body.nama
                }
            })
            if (mesin) {
                res.status(400).send({
                    message: 'Error',
                    error: 'Mesin Sudah Ada'
                })
                return;
            }
            await Mesin.create({
                name: req.body.nama
            })
            res.status(200).send({
                message: "Berhasil Menambahkan Mesin!",
                error: null
            })
        } catch (err) {
            console.error(err)
            res.status(500).send({
                message: "Gagal Menambah Mesin",
                error: "Server Error"
            })
        }
    },

    async getMesin(req, res) {
        const mesin = await Mesin.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!mesin) {
            res.status(400).send({
                message: "Error",
                error: "Mesin Tidak Ditemukan"
            })
            return;
        }
        res.status(200).send(mesin)
    },

    async updateMesin(req, res) {
        const mesin = await Mesin.findByPk(req.params.id)
        if (!mesin) {
            res.status(400).send({
                message: "Error",
                error: "Mesin Tidak Ditemukan"
            })
            return;
        }
        if (!req.body.nama) {
            res.status(400).send({
                message: "Error",
                error: "Nama Tidak Boleh Kosong"
            });
            return;
        }
        mesin.name = req.body.nama
        mesin.save()
        res.status(200).send({
            message: 'Mesin Berhasil Di Update',
            error: null
        })
    },

    async deleteMesin(req, res) {
        const mesin = await Mesin.findByPk(req.params.id)
        if (!mesin) {
            res.status(400).send({
                message: "Error",
                error: "User Tidak Ditemukan"
            })
            return;
        }
        mesin.destroy()
        res.status(200).send({
            message: 'Mesin Berhasil Dihapus',
            error: null
        })
    }
}