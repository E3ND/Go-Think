const Think = require('../models/Think')
const User = require('../models/User')

// Operador de busca
const { Op } = require('sequelize')

const uploadUser = require('../helpers/uploadImage')

module.exports = class ThinkController {
    static async showThinks(req, res) {
        // Mecanismo de busca
        let search = ''

        if(req.query.search) {
            search = req.query.search
        }
        // ------------------------------

        // Filtro de orddem dos pensamentos
        let order = 'DESC'

        if(req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const think = await Think.findAll({
            include: User,
            // Search
            where: {
                title: {[Op.like]: '%' + search + '%' },
            },
            order: [['createdAt', order]]
        })

        // Pe3gando somente os dataValues do array de dados que vem do include
        // Com plain todos os pensamentos e usuários vão ser jogados no mesmo array
        const thinks = think.map((result) => result.get({ plain: true }))

        // Exibir número de resultados exibidos
        let thinksQty = thinks.length

        if(thinksQty === 0) {
            thinksQty = false
        }

        res.render('thinks/home', { thinks, search, thinksQty })
    }

    static async dashboard(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId
            },
            // O include ja traz todos os user relacionados com a tabela Think
            include: Think,
            plain: true,
        })

        // Check if user exists
        if(!user) {
            res.redirect('/login')
            return
        }

       // Pegando somente os dataValues do array de dados que vem do include
       const thinks = user.Thinks.map((result) => result.dataValues)

       let emptyThinks = false

       if(thinks.length === 0) {
            emptyThinks = true
       }

        res.render('thinks/dashboard', { thinks, emptyThinks })
    }

    static createThinks(req, res) {
        res.render('thinks/create')
    }

    static async createThinksSave(req, res) {
        let image = null

        if(req.file){
            image = req.file.filename
        } 

        const think = {
            title: req.body.title,
            UserId: req.session.userid,
            image: image,
        }

        try {
            await Think.create(think)

            req.flash('messageConfirm', 'Pensamento criado com sucesso!')

            req.session.save(() => {
            res.redirect('/thinks/dashboard')
        })
        } catch (err) {
            console.log(`Erro ao criar pensamento --> ${err}`)
        }
    }

    static async removeThinks(req, res) {
        // Delete thinks
        const id = req.body.id
        const userid = req.session.userid

        try {
            await Think.destroy({
                where: {
                    id: id,
                    UserId: userid
                }
            })

            req.flash('messageConfirm', 'Pensamento excluido com sucesso!')

            req.session.save(() => {
                res.redirect('/thinks/dashboard')
            })
        } catch (err) {
            console.log(`Erro ao excluir pensamento --> ${err}`)
        }
    }

    static async updateThinks(req, res) {
        const id = req.params.id

        const think = await Think.findOne({
            raw: true,
            where: {
                id: id,
            }
        })
        
        res.render('thinks/edit', { think })
    }

    static async updateThinksSave(req, res) {
        const id = req.body.id

        let image = null

        if(req.file){
            image = req.file.filename
        } 

        const think = {
            title: req.body.title,
            image: image,
        }

        try {
            await Think.update( think, {
                where: {
                    id: id,
                }
            })
    
            req.flash('messageConfirm', 'Pensamento atualizado com sucesso!')
    
            req.session.save(() => {
                res.redirect('dashboard')
            })
        } catch (err) {
            console.log(`Erro ao atualizar pensamento --> ${err}`)
        }
    }
}