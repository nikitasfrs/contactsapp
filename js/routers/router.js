define([
    'jquery',
    'backbone',
    'views/contactsList',
    'views/contactsResults',
    'views/contactsApp',
    'views/contactCreateForm',
    'collections/contacts',
    'collections/contactsresults',
    'collections/contactspaginated',
    'models/contactPage',
    'views/contactsPageControl'
], function ($,
             Backbone,
             ContactsListView,
             ContactsResultsView, 
             ContactsAppView, 
             ContactCreateFormView,
             ContactsCollection, 
             ContactsResultsCollection,
             ContactsPaginatedCollection,
             ContactPageModel,
             ContactsPageControlView) {

    'use strict';

    var AppRouter = Backbone.Router.extend({
        initialize: function (options) {

            this.contactPageModel = new ContactPageModel();
            this.contactsPaginatedCollection = new ContactsPaginatedCollection(); 
            this.contactsPageControlView = new ContactsPageControlView({
                model: this.contactPageModel,
                router: this
            });
            
            this.contactsListView = new ContactsListView({
                router: this,
                contactsPageControlView: this.contactsPageControlView,
                collection: this.contactsPaginatedCollection,
                pageModel: this.contactPageModel
            });

            this.contactCreateFormView = new ContactCreateFormView({
                //router:router,
                collection: this.contactsPaginatedCollection
            });
            
            this.contactsAppView = new ContactsAppView({
                el: '#contacts-app',
                router:this,
                contactsListView: this.contactsListView,
                contactsResultsView: this.contactsResultsView,
                contactCreateFormView: this.contactCreateFormView
            });

            // temporarily hardwired
            this.contactPageModel.set('totalPages', 4);
        },

        routes: {
            "search/:query": "search",
            "page/:page":"pageController",
            "*path": "defaultRoute"
        },

        pageController:function(pageNum) {
            this.contactsListView.setUpPage(pageNum);
            this.contactsAppView.render();
        },

        defaultRoute: function () {
            this.contactsListView.setUpPage(0);
            this.contactsAppView.render();
        }
        
    });

    return AppRouter;

});
