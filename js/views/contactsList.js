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
        tagName: "section",
        className: "contacts",
        template: contactsContainerTmp,

        initialize: function(options) {

            this.router = options.router;
            this.pageModel = options.pageModel;
            this.contactsPageControlView = options.contactsPageControlView;
            this.waitView = new WaitView();

            this.listenTo(this.collection, 'add', this.addNew);
            this.listenTo(this.collection, 'request', this.onRequest);
            this.listenTo(this.collection, 'sync', this.onSync);
            this.listenTo(this.collection, 'error', this.onError);

            this.listenTo(this.collection, 'reset', this.addAll);
        },

        events: {
            'click .pagenum':'goToPage'
        },
        
        render: function() {

            this.$el.html(this.template);
            
            // cache main selector for later access
            this.$contactsList = this.$('#contacts-list');
            this.addAll();
            return this;
        },

        onRequest: function() {
            // show loading
            this.$el.html(this.waitView.render().el);
        },

        onSync: function() {
            // rerender & show list & page controls
            this.render().contactsPageControlView.setElement(
                this.$('#contacts-pages')).render();   
        },

        onError: function() {
            this.trigger('fetch:error');
            this.$el.html("<div class='error'><h3>Could not load content</h3><p>Please check your connection status.</p></div>");
        },

        goToPage: function(e) {
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
