var Backbone = require('backbone'),
    _ = require('underscore');

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

module.exports = Contact;
