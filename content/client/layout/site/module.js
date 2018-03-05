/* global angular */
(function () {
    'use strict'

    angular.module('client.site', ['ui.router'])

    angular.module('client.site').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('site.home', {
                url: "/",
                views: {
                    'content@site': {
                        templateUrl: 'client/layout/site/homepage/homepage.html'
                    }
                }
            })
            .state('site.neighborhood', {
                url: "/neighborhood",
                views: {
                    'content@site': {
                        templateUrl: 'client/layout/site/neighborhood/neighborhood.html'
                    }
                }
            })
            .state('site.list', {
                url: "/neighborhood/:neighborhood",
                views: {
                    'content@site': {
                        templateUrl: 'client/layout/site/list/list.html',
                        controller: 'listController as listCtrl'
                    }
                }
            })
    }
})()
