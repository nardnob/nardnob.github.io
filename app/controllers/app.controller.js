(function () {
    'use strict';

    angular
    	.module('app')
    	.controller('appController', AppController);

    AppController.$inject = ['$log', '$timeout', '$window'];

    function AppController($log, $timeout, $window) {
        var vm = this;

        vm.threeJsControl = null;

		activate();

        return vm;
        //////////

		function activate() {
			$(window).scroll(function () {
				if ($(window).scrollTop() > 70) {
					$('#main-nav-bar').addClass('main-nav-bar-fixed');
				} else if ($(window).scrollTop() < 71) {
					$('#main-nav-bar').removeClass('main-nav-bar-fixed');
				}
			});
		}
    }
})();