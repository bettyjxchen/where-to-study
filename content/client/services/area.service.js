/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict'

    angular.module('client.services')
        .factory('areaService', AreaServiceFactory)

    AreaServiceFactory.$inject = ['$http', '$q']

    function AreaServiceFactory($http, $q) {
        return {
            readAll: readAll,
            readById: readById,
            readByName: readByName,
            create: create,
            update: update,
            delete: _delete
        }

        function readAll() {
            return $http.get('/api/areas')
                .then(xhrSuccess)
                .catch(onError)
        }

        function readById(id) {
            return $http.get(`/api/areas/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function readByName(name) {
            return $http.get(`/api/areas/${name}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function create(areaData) {
            return $http.post('/api/areas', data)
                .then(xhrSuccess)
                .catch(onError)
        }

        function update(areaData) {
            return $http.put(`/api/areas/${data._id}`, data)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http.delete(`/api/areas/${id}`)
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
