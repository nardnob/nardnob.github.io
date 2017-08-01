(function () {
    'use strict';

    angular
        .module('app')
        .directive('bkdSpinnerContainer', spinnerContainerDirective);

    function spinnerContainerDirective() {
        return {
            restrict: 'E',
            scope: {
            },
            controller: spinnerContainerController,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: '/app/directives/spinnerContainer/spinnerContainer.html'
        }
    };

    spinnerContainerController.$inject = ['$log'];

    function spinnerContainerController($log) {
        var vm = this;

        return vm;
        //////////
    }
})();