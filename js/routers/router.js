define([
    'jquery',
    'backbone',
    'views/contactsList',
    'views/contactsApp',
    'views/contactCreateForm',
    'collections/contactspaginated',
    'models/contactPage',
    'views/contactsPageControl'
], function ($,
             Backbone,
             ContactsListView,
             ContactsAppView, 
             ContactCreateFormView,
             ContactsPaginatedCollection,
             ContactPageModel,
             ContactsPageControlView) {

    'use strict';

    var AppRouter = Backbone.Router.extend({
        initialize: function (options) {

            this.contactPageModel = new ContactPageModel();
            this.contactsPaginatedCollection = new ContactsPaginatedCollection({
                contactPageModel: this.contactPageModel
            }); 

            this.contactsPageControlView = new ContactsPageControlView({
                model: this.contactPageModel,
                router: this
            });
            
            this.contactsListView = new ContactsListView({
                el: $('.contacts'),
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

        },

        routes: {
            "search/:query": "search",
            "page/:page":"pageRoute",
            "*path": "defaultRoute"
        },

        pageRoute:function(pageNum) {
            this.appController(pageNum);
        },

        defaultRoute: function () {
            this.appController();
        },

        appController: function (page) {
            var onSuccess, onError;

            this.contactsAppView.render();
            page = page || 0;
            
            onSuccess = _.bind(function(data) {

                // update page controls
                this.contactPageModel.set({
                    total: data.total,
                    items: data.items,
                    current: parseInt(page)
                });

                // fetch page data
                this.contactsPaginatedCollection.fetch({
                    reset:true,
                    page:parseInt(page)
                });

            }, this);

            onError = _.bind(function(data) {
                this.contactsListView.onError();
            }, this);

            // fetch pagination info 
            $.ajax({
                url: "http://127.0.0.1:3000/pages",
                success: onSuccess,
                error: onError
            });
        }
        
    });

    return AppRouter;

});
