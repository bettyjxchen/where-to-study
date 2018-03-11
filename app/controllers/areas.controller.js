const responses = require('../models/responses');
const areasService = require('../services/areas.service')
const apiPrefix = '/api/areas';

module.exports = {
    readAll: readAll,
    readById: readById,
    readByName: readByName,
    create: create,
    update: update,
    delete: _delete
}

function readAll(req, res) {
    areasService.readAll()
        .then(areas => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = areas
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        });
}

function readById(req, res) {
    areasService.readById(req.params.id)
        .then(area => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = area
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function readByName(req, res) {
    areasService.readByName(req.params.name)
        .then(area => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = area
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function create(req, res) {
    areasService.create(req.model)
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
    areasService.update(req.params.id, req.model)
        .then(area => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res) {
    areasService.deactivate(req.params.id)
        .then(() => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send(new responses.ErrorResponse(err))
        })
}

