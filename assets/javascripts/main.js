/*global require*/
'use strict';

require.config({
    baseUrl: 'assets/javascripts',
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: '../vendor/jquery/dist/jquery',
		underscore: '../vendor/underscore/underscore',
		backbone: '../vendor/backbone/backbone',
		backboneLocalstorage: '../vendor/backbone.localstorage/backbone.localStorage',
		text: '../vendor/requirejs-text/text'
	}
});

require([
    'backbone',
    'routers/router'
], function (Backbone, AppRouter) {

    new AppRouter();
    Backbone.history.start({ pushState: true });

});
