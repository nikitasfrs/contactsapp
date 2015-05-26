/*global require*/
'use strict';

require.config({
    baseUrl: 'js',
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
		jquery: '../node_modules/jquery/dist/jquery',
		underscore: '../node_modules/underscore/underscore',
		backbone: '../node_modules/backbone/backbone',
		//backboneLocalstorage: '../node_modules/backbone.localstorage/backbone.localStorage',
		text: '../node_modules/requirejs-text/text'
	}
});

require([
    'backbone',
    'routers/router'
    ], function (Backbone, 
                 AppRouter) {

    // create main router
    var router = new AppRouter();
    Backbone.history.start();

});
