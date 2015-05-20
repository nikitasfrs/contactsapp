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
		backboneLocalstorage: '../node_modules/backbone.localstorage/backbone.localStorage',
		text: '../node_modules/requirejs-text/text'
	}
});

require([
    'backbone',
    'routers/router',
    'views/contactsList',
    'views/contactsResults',
    'views/contactsApp',
    'collections/contacts',
    'collections/contactsresults'
], function (Backbone, 
             AppRouter,
             ContactsListView,
             ContactsResultsView, 
             ContactsAppView, 
             ContactsCollection, 
             ContactsResultsCollection) {
    
    var router, contactsAppView, contactsListView, contactsResultsView, 
        pubSub, contactsCollection, contactsResultsCollection; 

    // create main router
    router = new AppRouter();
    Backbone.history.start();

    // create events bus
    pubSub = _.extend({}, Backbone.Events);

    contactsCollection = new ContactsCollection(); 
    contactsResultsCollection = new ContactsResultsCollection();

    /*contactsAppView = new ContactsAppView({
        el: '#contacts-app',
        router:router
    })*/

    contactsListView = new ContactsListView({
        el: '#contacts-app',
        router: router,
        collection: contactsCollection
    });


    contactsResultsView = new ContactsResultsView({
        router:router,
        collection: contactsResultsCollection
    });

});
