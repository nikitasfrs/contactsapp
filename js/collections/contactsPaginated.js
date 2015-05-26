define([
    'underscore',
    'backbone',
    'models/contact'
], function(_, Backbone, Contact) {
    'use strict';

    var ContactsPaginatedCollection = Backbone.Collection.extend({

        // TODO: modify to accept callback function
        // arguments
        initialize: function(options) {
            this.model = Contact;
            this.url = "http://127.0.0.1:3000/contacts";
            this.comparator = 'order';
            this.currentPage=0;
            this.modelsPerPage = 4;
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
            
            // a hack to emulate pagination for demo
            // behaviour using json-server's slice API calls

           var items = this.modelsPerPage,
               start = options.page * items,
               end = start + items;

           if (_.isNumber(options.page)) {
               options.page = options.page || 0;
               options.url = this.url + '?_start='+ parseInt(start) + '&_end=' + parseInt(end);
               this.currentPage = options.page;
           } 

           Backbone.sync.apply(this, arguments);

        }

    });

    return ContactsPaginatedCollection;
});
