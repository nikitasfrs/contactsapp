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
            this.listenTo(Contacts, 'all', this.render);
            this.listenTo(Contacts, 'add', this.addNew);
            
            // reset gets triggered in every visit if 
            // localstorage has been previously populated
            this.listenTo(Contacts, 'reset', this.addAll);
            this.listenTo(Contacts, 'contacts:duplicate', this.alertDuplicate);

            this.$contactsList = $('#contacts-list');
            this.$firstName = $('#firstName');
            this.$lastName = $('#lastName');
            this.$phone = $('#phone');
            this.$email = $('#email');

            Contacts.fetch({
                reset: true,

                success: _.bind(function (col,rep,opt) {
                   $(this.el).show();
                }, this),

                error: function (col, rep, opt) {
                    console.log('error fetching data');
                }
            });

        },

        render: function() {

            return this;
        },

        createNew: function(e) {

            Contacts.create({
                firstName: this.$firstName.val(),
                lastName: this.$lastName.val(),
                phone: this.$phone.val(),
                email: this.$email.val(),
                order: Contacts.nextOrder()
            }, {wait: true});
            
        },

        addNew: function(contact) {
            // create new contact view 
            // and apend it to the main view
            var view = new ContactView({ model: contact });
            this.$contactsList.prepend(view.render().el);
        },

        addAll: function () {
            this.$contactsList.empty();
            Contacts.sort();
            Contacts.each(this.addNew, this);
        },

        alertDuplicate: function() {
            console.log('Duplicates currently are not accepted.');
        }

    });

    return ContactsListView;
});
