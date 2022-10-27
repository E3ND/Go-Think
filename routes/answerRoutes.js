const express = require('express')
const router = express.Router()

const checkAuth = require('../helpers/auth').checkAuth

const uploadUser = require('../helpers/uploadImage')

const AnswerController = require('../controllers/AnswerController')

router.get('/allAnswer/:id', checkAuth, AnswerController.answersAll)
router.post('/createAnswer', checkAuth, uploadUser.single('answerImage'), AnswerController.createAnswer)

module.exports = router