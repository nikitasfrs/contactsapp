define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        initialize: function (options) {
            this.pubSub = _.extend({}, _.pick(options, 'pubSub')); 
        },
        routes: {
            "search/:query": "search",
            "*path" : "defaultRoute"
        },
 
        defaultRoute: function () {
            $('#contacts-app').show();
        },

        search: function (query) {
            //this.pubSub.trigger('contacts:search', query);   
        }
        
    });

    return AppRouter;

});
