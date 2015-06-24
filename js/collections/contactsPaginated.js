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
        
       var contactPageModel = options.pages || this.defaultPageModel, 
           items = contactPageModel.get('items'),
           page = contactPageModel.get('current'),
           start = page * items,
           end = start + items;

       options.url = this.url + '?_start='+ parseInt(start) + '&_end=' + parseInt(end);

       Backbone.sync.apply(this, arguments);

    },



});

module.exports = ContactsPaginatedCollection;
