const router = require('express').Router()
const neighborhoodsController = require('../controllers/neighborhoods.controller')
const validateBody = require('../filters/validate.body')
const Neighborhood = require('../models/neighborhood')

module.exports = router

// api routes ===========================================================
router.get('/', neighborhoodsController.readAll)
router.get('/:id([0-9a-fA-F]{24})', neighborhoodsController.readById)
router.get('/:name', neighborhoodsController.readByName)
router.post('/', validateBody(Neighborhood), neighborhoodsController.create)
router.put('/:id([0-9a-fA-F]{24})', validateBody(Neighborhood),neighborhoodsController.update)
router.delete('/:id([0-9a-fA-F]{24})', neighborhoodsController.delete)