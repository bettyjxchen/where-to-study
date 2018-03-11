const responses = require('../models/responses');
const neighborhoodsService = require('../services/neighborhoods.service')
const apiPrefix = '/api/neighborhoods';

module.exports = {
    readAll: readAll,
    readById: readById,
    readByName: readByName,
    create: create,
    update: update,
    delete: _delete
}

function readAll(req, res) {
    neighborhoodsService.readAll()
        .then(neighborhoods => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = neighborhoods
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        });
}

function readById(req, res) {
    neighborhoodsService.readById(req.params.id)
        .then(neighborhood => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = neighborhood
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function readByName(req, res) {
    neighborhoodsService.readByName(req.params.name)
        .then(neighborhood => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = neighborhood
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function create(req, res) {
    neighborhoodsService.create(req.model)
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
    neighborhoodsService
        .update(req.params.id, req.model)
        .then(neighborhood => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res) {
    neighborhoodsService
        .delete(req.params.id)
        .then(() => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send(new responses.ErrorResponse(err))
        })
}

