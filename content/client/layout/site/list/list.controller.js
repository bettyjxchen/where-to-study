/* global angular */
(function () {
    angular.module('client.site')
        .controller('listController', ListController)

    ListController.$inject = ['$stateParams']

    function ListController($stateParams) {
        var vm = this
        vm.neighborhood = ""

        init()

        function init() {
            vm.neighborhood = $stateParams.neighborhood
  
        }


       
    }
})()
