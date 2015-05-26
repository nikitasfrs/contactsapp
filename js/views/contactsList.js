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
        tagName: "section",
        className: "contacts",
        template: contactsContainerTmp,

        initialize: function(options) {

            this.router = options.router;

            //this.listenTo(this.router, 'contacts:page', this.getPage);
            //this.listenTo(this.router, 'contacts:init', this.initCollection);

            this.listenTo(this.collection, 'add', this.addNew);
            // reset gets triggered in every visit if 
            // localstorage has been previously populated
            this.listenTo(this.collection, 'reset', this.addAll);
            this.contactsPageControlView = options.contactsPageControlView;

            this.pageModel = options.pageModel;

        },
        
        render: function() {

            this.$el.html(this.template);
           // this.$('#contacts-pages').html(this.contactsPageControlView.render().el); 
            this.contactsPageControlView.setElement(
                this.$('#contacts-pages')).render();

            // cache main selector for later access
            this.$contactsList = this.$('#contacts-list');

            this.addAll();
            return this;
        },

        createNew: function(e) {

            this.collection.create({
                firstName: this.$firstName.val(),
                lastName: this.$lastName.val(),
                phone: this.$phone.val(),
                email: this.$email.val(),
                order: this.collection.nextOrder()
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
