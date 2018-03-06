/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict'

    angular.module('client.services')
        .factory('coffeeShopService', CoffeeShopServiceFactory)

    CoffeeShopServiceFactory.$inject = ['$http', '$q']

    function CoffeeShopServiceFactory($http, $q) {
        return {
            readAll: readAll,
            readById: readById,
            create: create,
            update: update,
            delete: _delete
        }

        function readAll() {
            return $http.get('/api/coffee-shops')
                .then(xhrSuccess)
                .catch(onError)
        }

        function readById(id) {
            return $http.get(`/api/coffee-shops/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function create(data) {
            return $http.post('/api/coffee-shops', data)
                .then(xhrSuccess)
                .catch(onError)
        }

        function update(data) {
            return $http.put(`/api/coffee-shops/${data._id}`, data)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http.delete(`/api/coffee-shops/${id}`)
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
