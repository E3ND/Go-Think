const express = require('express')
const router = express.Router()

const ThinkController = require('../controllers/ThinkController')

const checkAuth = require('../helpers/auth').checkAuth

const uploadUser = require('../helpers/uploadImage')

router.get('/', ThinkController.showThinks)
router.get('/dashboard', checkAuth, ThinkController.dashboard)
router.get('/add', checkAuth, ThinkController.createThinks)
router.post('/add', checkAuth, uploadUser.single('image'), ThinkController.createThinksSave)

router.post('/remove', checkAuth, ThinkController.removeThinks)

router.get('/edit/:id', checkAuth, ThinkController.updateThinks)
router.post('/edit', checkAuth, uploadUser.single('image'), ThinkController.updateThinksSave)


module.exports = router