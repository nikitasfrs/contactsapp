define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var Contact = Backbone.Model.extend({
        defaults: {
            firstName: "",
            lastName: "",
            phone: "",
            email: ""
        }
        
        //toJSON: function() {}
    });
    return Contact;
});
