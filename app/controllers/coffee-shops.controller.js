const responses = require('../models/responses');
const coffeeShopsService = require('../services/coffee-shops.service')
const apiPrefix = '/api/coffee-shops';

module.exports = {
    readAll: readAll,
    readById: readById,
    create: create,
    update: update,
    delete: _delete
}

function readAll(req, res) {
    coffeeShopsService.readAll()
        .then(coffeeShops => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = coffeeShops
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        });
}

function readById(req, res) {
    coffeeShopsService.readById(req.params.id)
        .then(coffeeShop => {
            if (!coffeeShop) {
                res.status(404).send(new responses.ErrorResponse("Item does not exist."))
            }
            else {
                const responseModel = new responses.ItemResponse()
                responseModel.item = coffeeShop
                res.json(responseModel)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function create(req, res) {
    coffeeShopsService.create(req.model)
        .then(id => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = id
            res.status(201)
                .location(`${apiPrefix}/${id}`)
                .json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function update(req, res) {
    coffeeShopsService.update(req.params.id, req.model)
        .then(coffeeShop => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res) {
    coffeeShopsService.deactivate(req.params.id)
        .then(() => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send(new responses.ErrorResponse(err))
        })
}

