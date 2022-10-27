const Answer = require('../models/Answer')
const Think = require('../models/Think')
const User = require('../models/User')

const uploadUser = require('../helpers/uploadImage')

module.exports = class AnswerController {
    static async answersAll(req, res) {
        const { id } = req.params
        
        // Encontando o pensamento no qual foi clicado
        const think = await Think.findOne({
            where: {
                id: id
            }, 
            include: User,
            plain: true,
        })
        
        // Puxando as respostas desse pensamento
        const answers = await Answer.findAll({
            where: {
                ThinkId: think.id,
            },
            include: User,
            raw: true
        })
        
        res.render('answer/allAnswer', { think, answers })
    }

    static async createAnswer(req, res) {
        let answerImage = null

        if(req.file){
            answerImage = req.file.filename
        } 

        const answer = {
            answerText: req.body.answerText,
            answerImage: answerImage,
            edit: false,
            ThinkId: req.body.ThinkId,
            UserId: req.session.userid
        }

        try {
            await Answer.create(answer)

            req.flash('messageConfirm', 'Resposta criado com sucesso!')

            req.session.save(() => {
                res.redirect(`/answers/allAnswer/${req.body.ThinkId}`)
            })
        } catch (error) {
            console.log(`Erro ao criar uma resposta --> ${error}`)
        }

        
    }
}