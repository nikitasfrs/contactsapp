define([
    'underscore',
    'backbone',
    //'backboneLocalstorage',
    'models/contact'
], function(_, Backbone, Contact) {
    'use strict';

    var ContactsResultsCollection = Backbone.Collection.extend({

        // TODO: modify to accept callback function
        // arguments
        initialize: function() {
            this.model = Contact;
            //this.comparator = 'order';
        },

		nextOrder: function () {
			//return this.length ? this.last().get('order') + 1 : 1;
		}

    });

    return ContactsResultsCollection;
});
