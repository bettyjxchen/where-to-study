const router = require('express').Router()
const coffeeShopsController = require('../controllers/coffee-shops.controller')
const validateBody = require('../filters/validate.body')
const CoffeeShop = require('../models/coffee-shop')

module.exports = router

// api routes ===========================================================
router.get('/', coffeeShopsController.readAll)
router.get('/:id([0-9a-fA-F]{24})', coffeeShopsController.readById)
router.post('/', validateBody(CoffeeShop), coffeeShopsController.create)
router.put('/:id([0-9a-fA-F]{24})', validateBody(CoffeeShop),coffeeShopsController.update)
router.delete('/:id([0-9a-fA-F]{24})', coffeeShopsController.delete)