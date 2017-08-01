(function () {
    'use strict';

    angular
        .module('app')
        .directive('abtRsHiscores', rsHiscoresDirective);

    function rsHiscoresDirective() {
        return {
            restrict: 'E',
            scope: {
            },
            controller: rsHiscoresController,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: '/app/directives/rsHiscores/rsHiscores.html'
        }
    };

    rsHiscoresController.$inject = ['$log', '$window', '$timeout', '$http'];

    function rsHiscoresController($log, $window, $timeout, $http) {
        var vm = this;
        
        //Fields
        vm.hiscores = null;
        
        //Methods
        vm.getHiscores = getHiscores;
        
        activate();

        return vm;
        //////////
        
        function activate() {
        }
        
        function getHiscores() {
        	//$http({
        	//	method: "JSONP",
        	//	url: "http://services.runescape.com/m=hiscore/index_lite.ws?player=Abend"
        	//}).then(function successCalback(response) {
        	//	vm.hiscores = response.data;
        	//}, function errorCallback() {
        	//	vm.hiscores = "Error retrieving hiscores.";
        	//});
        }
    }
})();