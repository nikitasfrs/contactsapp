var Backbone = require('backbone'),
    _ = require('underscore'),
    Contact = require('../models/contact');

'use strict';

var ContactsPaginatedCollection = Backbone.Collection.extend({

    initialize: function(options) {
        this.model = Contact;
        this.url = "http://127.0.0.1:3000/contacts";
        this.comparator = 'order';
        this.eventbus = options.eventbus;

        this.listenTo(this.eventbus, 'contact:create', this.create);
        
    },

    create: function (attributes, options) {
        // implement model processing logic
        var items = this.where({
            firstName: attributes.firstName,
            lastName: attributes.lastName
        });

        if (items.length) {
            // model exists
            this.trigger('contacts:duplicate');
            return false;
        }

        Backbone.Collection.prototype.create.apply(this,arguments);
    },

    sync: function(method, model, options) {
       var pageModel = options.pageModel; 
       options.url = this._getRequestUrl(this.url, pageModel);
       Backbone.sync.apply(this, arguments);
    },

    _getRequestUrl: function(baseUrl, pageModel){
        var items = pageModel.get('items'),
            page = pageModel.get('current'),
            start = page * items,
            end = start + items;

        var url = baseUrl + '?_start='+ parseInt(start) + '&_end=' + parseInt(end);

        return url;
    }
});

//module.exports = ContactsPaginatedCollection;
module.exports = function createModule(opt) {
    return new ContactsPaginatedCollection(opt);
}
module.exports.getClass = function () {
    return ContactsPaginatedCollection;
}
