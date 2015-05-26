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

            this.contactCreateFormView = new ContactCreateFormView({
                //router:router,
                collection: this.contactsPaginatedCollection
            });
            
            this.contactsListView = new ContactsListView({
                router: this,
                contactsPageControlView: this.contactsPageControlView,
                collection: this.contactsPaginatedCollection,
                pageModel: this.contactPageModel
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
 
        search: function (query) {

        },

        pageController:function(pageNum) {
            this.trigger('contacts:page', pageNum);
            this.contactsPaginatedCollection.fetch({
                reset: true,
                page: parseInt(pageNum),

                success: _.bind(function (col,rep,opt) {
                    // create page model
                    // from the first element of the collection
                }, this),

                error: function (col, rep, opt) {
                    console.log('error fetching data');
                }
            });
            this.contactPageModel.set('currentPage', parseInt(pageNum));
            this.contactsAppView.render();
        },

        defaultRoute: function () {
            //this.trigger('contacts:init');
            this.contactsPaginatedCollection.fetch({
                reset: true,
                page: 0,

                success: _.bind(function (col,rep,opt) {

                }, this),

                error: function (col, rep, opt) {
                    console.log('error fetching data');
                }
            });
            this.contactPageModel.set('currentPage', 0);
            this.contactsAppView.render();
        }
        
    });

    return AppRouter;

});
