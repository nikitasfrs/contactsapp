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

    initialize: function(opt) {
        this.urlRoot='http://127.0.0.1:3000/contacts';
    },

    validate: function (attrs, options) {
        if (!attrs.firstName || !attrs.lastName) {
            return "First name and Last name fields cannot be empty."
        }

    }
    
    //toJSON: function() {}
});

module.exports = function createModule(opt) {
    return new Contact(opt);
}
