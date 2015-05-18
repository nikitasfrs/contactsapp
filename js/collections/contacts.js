define([
    'underscore',
    'backbone',
    'backboneLocalstorage',
    'models/contact'
], function(_, Backbone, Store, Contact) {
    'use strict';

    var ContactsCollection = Backbone.Collection.extend({

        // TODO: modify to accept callback function
        // arguments
        initialize: function() {
            this.model = Contact;
            //this.localStorage = new Store('contacts-backbone');
            this.url = "http://127.0.0.1:3000/contacts";
            this.comparator = 'order';
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

    });

    return new ContactsCollection();
});
