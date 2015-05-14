define([
    'underscore',
    'backbone',
    'backboneLocalstorage',
    'models/contact'
], function(_, Backbone, Store, Contact) {
    'use strict';

    var ContactsCollection = Backbone.Collection.extend({

        model: Contact,

        localStorage: new Store('contacts-backbone'),
		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			return this.length ? this.last().get('order') + 1 : 1;
		},

		// Todos are sorted by their original insertion order.
		comparator: 'order'
    });

    return new ContactsCollection();
});
