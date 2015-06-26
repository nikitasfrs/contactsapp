var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    ContactsListView = require('../views/contactsList'),
    ContactsAppView = require('../views/contactsApp'),
    ContactCreateFormView = require('../views/contactCreateForm'),
    ContactsPaginatedCollection = require('../collections/contactsPaginated'),
    PageModel = require('../models/page'),
    PageControlView = require('../views/pageControl');

var AppController = function(options){
    this.initialize.apply(this, arguments);
};

// TODO share the same event bus as views
_.extend(AppController.prototype, Backbone.Events, {
    initialize: function (options) {

        this.eventbus = options.eventbus;
        this.listenTo(this.eventbus, 'page:change', this.fetchPage);


        this.pageModel = new PageModel({
            eventbus:this.eventbus
        });

        this.contactsPaginatedCollection = new ContactsPaginatedCollection({
            defaultPageModel: this.pageModel,
            eventbus:this.eventbus
        }); 

        this.pageControlView = new PageControlView({
            model: this.pageModel,
            eventbus:this.eventbus
        });
        
        this.contactsListView = new ContactsListView({
            pageControlView: this.pageControlView,
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
            pageControlView: this.pageControlView,
            contactCreateFormView: this.contactCreateFormView,
            eventbus:this.eventbus
        });
    },

    fetchPage: function (pageModel) {
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
        
        var fetchPage = _.bind(function(data) {
            this.fetchPage(this.pageModel);
        },this);

        var showError = _.bind(function() {
            this.contactsListView.onError();
        },this);

        this.contactsAppView.render();

        $.ajax({
            url: "http://127.0.0.1:3000/pages",
            success: createPageModel
        })
        .then(fetchPage)
        .fail(showError);

    }
});


module.exports = AppController;
