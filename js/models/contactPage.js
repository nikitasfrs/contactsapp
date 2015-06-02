define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ContactPage = Backbone.Model.extend({

        defaults: {
            total: 0,
            items: 0,
            current: 0
        }
        
        //toJSON: function() {}
    });
    return ContactPage;
});
