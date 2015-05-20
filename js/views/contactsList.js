define([
    'jquery',
    'underscore',
    'backbone', 
    'views/contact',
    'text!templates/contactsContainer.html'
], function ($,
             _, 
             Backbone, 
             ContactView, 
             contactsContainerTmp){
    'use strict';

    var ContactsListView = Backbone.View.extend({
        tagName: "div",
        className: "contacts-container",
        template: _.template(contactsContainerTmp),

        // delegated events
        events: {
            'click #saveContact': 'createNew'
        },

        initialize: function() {

            //this.listenTo(this.collection, 'all', this.render);
            this.listenTo(this.collection, 'add', this.addNew);
            
            // reset gets triggered in every visit if 
            // localstorage has been previously populated
            this.listenTo(this.collection, 'reset', this.addAll);

            this.$contactsList = $('#contacts-list');
            this.$firstName = $('#firstName');
            this.$lastName = $('#lastName');
            this.$phone = $('#phone');
            this.$email = $('#email');

            this.collection.fetch({
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
            this.addAll();
            // this.$el.html(this.template())...
            return this;
        },

        createNew: function(e) {

            this.collection.create({
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
            this.collection.sort();
            this.collection.each(this.addNew, this);
        }

    });

    return ContactsListView;
});
