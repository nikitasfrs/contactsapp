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
            
            // reset gets triggered in every visit if 
            // localstorage has been previously populated
            this.listenTo(Contacts, 'reset', this.addAll);

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

            // each model will have as a unique ID the first
            // and last names concatenated and camelCased
            var id = (this.$firstName.val() + 
                      (this.$lastName.val())).trim();

            // instantiates model with attrs, saves it to server
            // adds it to collection and returns it.
            // It also performs validations checks to model.
            //
            // We could also pass validate: true here instead of
            // wait attr

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
            this.$contactsList.append(view.render().el);
        },

        addAll: function () {
            this.$contactsList.empty();
            Contacts.each(this.addNew, this);
        }


    });

    return ContactsListView;
});
