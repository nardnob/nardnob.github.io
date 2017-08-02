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
				if ($(window).scrollTop() > 100) {
					$('#main-nav-bar').addClass('main-nav-bar-fixed');
				} else if ($(window).scrollTop() < 101) {
					$('#main-nav-bar').removeClass('main-nav-bar-fixed');
				}
			});
		}
    }
})();
