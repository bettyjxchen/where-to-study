/* global angular */
(function () {
    angular.module('client.site')
        .controller('neighborhoodController', NeighborhoodController)

   NeighborhoodController.$inject = ['$stateParams']

    function NeighborhoodController($stateParams) {
        var vm = this
        
        vm.sayHi = _sayHi

        init()

        function init() {
           
        }

        function _sayHi() {
            console.log("hi")
        }


       
    }
})()
