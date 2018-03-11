/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict'

    angular.module('client.services')
        .factory('neighborhoodService', NeighborhoodServiceFactory)

    NeighborhoodServiceFactory.$inject = ['$http', '$q']

    function NeighborhoodServiceFactory($http, $q) {
        return {
            readAll: readAll,
            readById: readById,
            readByName: readByName,
            create: create,
            update: update,
            delete: _delete
        }

        function readAll() {
            return $http.get('/api/neighborhoods')
                .then(xhrSuccess)
                .catch(onError)
        }

        function readById(id) {
            return $http.get(`/api/neighborhoods/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function readByName(name) {
            return $http.get(`/api/neighborhoods/${name}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function create(neighborhoodData) {
            return $http.post('/api/neighborhoods', data)
                .then(xhrSuccess)
                .catch(onError)
        }

        function update(neighborhoodData) {
            return $http.put(`/api/neighborhoods/${data._id}`, data)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http.delete(`/api/neighborhoods/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
            console.log(error.data)
            return $q.reject(error.data)
        }
    }
})()
