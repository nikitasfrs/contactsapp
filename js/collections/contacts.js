define([
    'underscore',
    'backbone',
    'backboneLocalstorage',
    'models/contact'
], function(_, Backbone, Storage, Contact) {
    'use strict';

    var ContactsCollection = Backbone.Collection.extend({

        model: Contact,
        localStorage: new Storage('contacts-backbone')

    });

    return new ContactsCollection();
});
