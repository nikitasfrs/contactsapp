define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            "create" : "createContact"
        },

        createContact: function () {
            console.log('contact route callback');
        }

    });

    return AppRouter;

});
