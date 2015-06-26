var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    ContactsListView = require('../views/contactsList'),
    ContactsAppView = require('../views/contactsApp'),
    ContactCreateFormView = require('../views/contactCreateForm'),
    ContactsPaginatedCollection = require('../collections/contactsPaginated'),
    PageModel = require('../models/page'),
    ContactsPageControlView = require('../views/contactsPageControl');

var AppController = function(options){
    this.initialize.apply(this, arguments);
};

// TODO share the same event bus as views
_.extend(AppController.prototype, Backbone.Events, {
    initialize: function (options) {

        this.eventbus = options.eventbus;
        this.listenTo(this.eventbus, 'page:change', this.changePage);


        this.pageModel = new PageModel({
            eventbus:this.eventbus
        });

        this.contactsPaginatedCollection = new ContactsPaginatedCollection({
            defaultPageModel: this.pageModel,
            eventbus:this.eventbus
        }); 

        this.contactsPageControlView = new ContactsPageControlView({
            model: this.pageModel,
            eventbus:this.eventbus
        });
        
        this.contactsListView = new ContactsListView({
            contactsPageControlView: this.contactsPageControlView,
            collection: this.contactsPaginatedCollection,
            eventbus:this.eventbus
        });

        this.contactCreateFormView = new ContactCreateFormView({
            //router:router,
            eventbus:this.eventbus
        });
        
        this.contactsAppView = new ContactsAppView({
            el: '#contacts-app',
            contactsListView: this.contactsListView,
            contactsPageControlView: this.contactsPageControlView,
            contactCreateFormView: this.contactCreateFormView,
            eventbus:this.eventbus
        });
    },

    changePage: function (pageModel) {
        this.contactsPaginatedCollection.fetch({
            reset:true,
            pageModel:pageModel
        });
    },

    setupPageAction: function(page) {
        var page = page || 0; 

        var createPageModel = _.bind(function(data) {
            this.pageModel.set({
                total: data.total,
                items: data.items,
                current: parseInt(page)
            });
        }, this)
        
        var fetchCollection = _.bind(function(data) {
            this.contactsPaginatedCollection.fetch({
                reset:true,
                pageModel:this.pageModel
            });
        },this);

        var showError = _.bind(function() {
            this.contactsListView.onError();
        },this);

        this.contactsAppView.render();

        $.ajax({
            url: "http://127.0.0.1:3000/pages",
            success: createPageModel
        })
        .then(fetchCollection)
        .fail(showError);

    }
});


module.exports = AppController;
