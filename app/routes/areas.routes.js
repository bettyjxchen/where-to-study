const router = require('express').Router()
const areasController = require('../controllers/areas.controller')
const validateBody = require('../filters/validate.body')
const Area = require('../models/area')

module.exports = router

// api routes ===========================================================
router.get('/', areasController.readAll)
router.get('/:id([0-9a-fA-F]{24})', areasController.readById)
router.get('/:name', areasController.readByName)
router.post('/', validateBody(Area), areasController.create)
router.put('/:id([0-9a-fA-F]{24})', validateBody(Area),areasController.update)
router.delete('/:id([0-9a-fA-F]{24})', areasController.delete)