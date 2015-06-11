var Backbone = require('backbone'),
    _ = require('underscore');

'use strict';

var ContactPage = Backbone.Model.extend({

    defaults: {
        total: 0,
        items: 0,
        current: 0
    }
    
    //toJSON: function() {}
});

module.exports = ContactPage;
