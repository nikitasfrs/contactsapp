define([
    'jquery',
    'underscore',
    'backbone', 
    'views/contact',
    'views/waitView',
    'text!templates/contactsContainer.html'
], function ($,
             _, 
             Backbone, 
             ContactView, 
             WaitView,
             contactsContainerTmp){
    'use strict';

    var ContactsListView = Backbone.View.extend({
        template: contactsContainerTmp,

        initialize: function(options) {

            this.router = options.router;
            this.pageModel = options.pageModel;
            this.contactsPageControlView = options.contactsPageControlView;
            this.waitView = new WaitView();

            this.listenTo(this.collection, 'add', this.addNew);
            this.listenTo(this.collection, 'error', this.onError);
            this.listenTo(this.collection, 'reset', this.render);
            //this.listenTo(this.collection, 'request', this.prerender);
            this.listenToOnce(this.collection, 'sync', this.onFirstSync);
        },

        events: {
            'click .pagenum':'goToPage'
        },

        prerender: function() {
            this.$el.html(this.waitView.render().el);
            return this;
        },

        onFirstSync: function () {
            // prerender on each col request
            this.listenTo(this.collection, 'request', this.prerender);
        },
        
        render: function() {
            this.$el.html(this.template);
            this.contactsPageControlView.setElement(
                this.$('#contacts-pages')).render();            

            this.$contactsList = this.$('#contacts-list');

            this.addAll();
            return this;
        },

        onError: function() {
            this.trigger('fetch:error');
            this.$el.html("<div class='error'><h3>Could not load content</h3><p>Please check your connection status.</p></div>");
        },

        goToPage: function(e) {
            // we handle this internally to avoid
            // router reinitialization 
            
            var page = e.target.text;
            e.preventDefault();  
            this.setUpPage(page)
            this.router.navigate('page/' + page);
        },

        setUpPage: function(page) {
            this.collection.fetch({
                reset: true,
                page: parseInt(page)
            });
            this.pageModel.set('currentPage', parseInt(page));
        },

        addNew: function(contact) {
            // create new contact view 
            // and append it to the main one
            var view = new ContactView({ model: contact });
            this.$contactsList.prepend(view.render().el);
        },

        addAll: function () {
            this.collection.sort();
            this.collection.each(this.addNew, this);
        }

    });

    return ContactsListView;
});
