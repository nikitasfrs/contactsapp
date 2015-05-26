define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ContactPage = Backbone.Model.extend({

        defaults: {
            totalPages: 0,
            currentPage: 0
        }
        
        //toJSON: function() {}
    });
    return ContactPage;
});
