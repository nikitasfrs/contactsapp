define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            "*path" : "defaultRoute"
        },

        defaultRoute: function () {
            $('#contacts-app').show();
        }
        
    });

    return AppRouter;

});
