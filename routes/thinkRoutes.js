const express = require('express')
const router = express.Router()

const ThinkController = require('../controllers/ThinkController')

const checkAuth = require('../helpers/auth').checkAuth

router.get('/', ThinkController.showThinks)
router.get('/dashboard', checkAuth, ThinkController.dashboard)
router.get('/add', checkAuth, ThinkController.createThinks)
router.post('/add', checkAuth, ThinkController.createThinksSave)

router.post('/remove', checkAuth, ThinkController.removeThinks)

router.get('/edit/:id', checkAuth, ThinkController.updateThinks)
router.post('/edit', checkAuth, ThinkController.updateThinksSave)


module.exports = router