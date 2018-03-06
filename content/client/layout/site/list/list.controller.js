/* global angular */
(function () {
    angular.module('client.site')
        .controller('listController', ListController)

    ListController.$inject = ['$stateParams', 'neighborhoodService']

    function ListController($stateParams, neighborhoodService) {
        var vm = this
        vm.neighborhood = ""

        init()

        function init() {
            vm.neighborhood = $stateParams.neighborhood
  
        }


       
    }
})()
