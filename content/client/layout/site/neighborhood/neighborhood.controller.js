/* global angular */
(function () {
    angular.module('client.site')
        .controller('neighborhoodController', NeighborhoodController)

    NeighborhoodController.$inject = ['$stateParams', 'neighborhoodService']

    function NeighborhoodController($stateParams, neighborhoodService) {
        var vm = this
        vm.neighborhoods = []


        init()

        function init() {
            neighborhoodService.readAll()
                .then(neighborhoods => {
                    vm.neighborhoods = neighborhoods.items
                    console.log(vm.neighborhoods)
                })

        }





    }
})()
