(function () {
    'use strict';

    angular
    	.module('app')
    	.controller('appController', AppController);

    AppController.$inject = ['$log', '$timeout', '$window'];

    function AppController($log, $timeout, $window) {
        var vm = this;

        vm.threeJsControl = null;

        return vm;
        //////////
    }
})();