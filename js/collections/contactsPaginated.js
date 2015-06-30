var Backbone = require('backbone'),
    _ = require('underscore'),
    Contact = require('../models/contact');

'use strict';

var ContactsPaginatedCollection = Backbone.Collection.extend({

    initialize: function(options) {
        this.model = Contact;
        this.url = "http://127.0.0.1:3000/contacts";
        this.comparator = 'order';

        this.defaultPageModel = options.defaultPageModel;
        this.eventbus = options.eventbus;

        this.listenTo(this.eventbus, 'contact:create', this.create);
        
    },

    create: function (model, options) {
        // implement model processing logic
        var items = this.where({
            firstName: model.firstName,
            lastName: model.lastName
        });

        if (items.length) {
            // model exists
            this.trigger('contacts:duplicate');
            return false;
        }
        
        Backbone.Collection.prototype.create.apply(this,arguments);
    },

    nextOrder: function () {
        return this.length ? this.last().get('order') + 1 : 1;
    },
    
    sync: function(method, model, options) {
        
       var pageModel = options.pages || this.defaultPageModel; 
       
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

module.exports = ContactsPaginatedCollection;
