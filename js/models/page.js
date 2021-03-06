var Backbone = require('backbone'),
    _ = require('underscore');

    'use strict';

var PageModel = Backbone.Model.extend({

    defaults: {
        total: 0,
        items: 0,
        current: 0
    },

    initialize: function(options) {
       this.eventbus=options.eventbus;
    }
    
    //toJSON: function() {}
});

module.exports = function createModule(opt) {
    return new PageModel(opt);
}

module.exports.getClass = function () {
    return PageModel;
}
