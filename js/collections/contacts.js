define([
    'underscore',
    'backbone',
    'models/contact'
], function(_, Backbone, Contact) {
    'use strict';

    var ContactsCollection = Backbone.Collection.extend({

        // TODO: modify to accept callback function
        // arguments
        initialize: function() {
            this.model = Contact;
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

        fetchPage: function(page) {
            
            // aimed to use with localStorage or 
            // REST API mockups like json-server
            
            var items=2,
                url = this.url;
            this.url = this.url + '?_start='+ page + '&_end=' + (page+items);
            this.fetch({
                reset: true
            });

           // TODO either override fetch to make more extendable
            // or create a paginated collection controller
            //this.url=url;
        }

    });

    return ContactsCollection;
});
