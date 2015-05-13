define([
    'jquery',
    'underscore',
    'backbone', 
    'collections/contacts',
    'views/contact'
], function ($, _, Backbone, Contacts, ContactView){
    'use strict';

    var ContactsListView = Backbone.View.extend({

        template: null,

        // delegated events
        events: {
            'click #saveContact': 'createNew' 
        },

        initialize: function() {
            console.log('top-level view initialized');
            
            this.listenTo(Contacts, 'all', this.render);
            this.listenTo(Contacts, 'add', this.addNew);

            this.$contactsList = $('#contacts-list');
            this.$firstName = $('#firstName');
            this.$lastName = $('#lastName');
            this.$phone = $('#phone');
            this.$email = $('#email');

            Contacts.fetch({reset: true});

        },

        render: function() {

            return this;
        },

        createNew: function(e) {
            // create new contact model
            // and add it to the collection
            Contacts.create({
                firstName: this.$firstName.val(),
                lastName: this.$lastName.val(),
                phone: this.$phone.val(),
                email: this.$email.val()
            });
        },

        addNew: function(contact) {
            // create new contact view 
            // and apend it to the main view
            var view = new ContactView({ model: contact });
            this.$contactsList.append(view.render().el);
        }

    });

    return ContactsListView;
});
