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
        },

        validate: function (attrs, options) {
            if (!attrs.firstName || !attrs.lastName) {
                return "First name and Last name fields cannot be empty."
            }

        }
        
        //toJSON: function() {}
    });
    return Contact;
});