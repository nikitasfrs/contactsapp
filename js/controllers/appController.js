var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    ContactsListView = require('../views/contactsList'),
    ContactsAppView = require('../views/contactsApp'),
    ContactCreateFormView = require('../views/contactCreateForm'),
    ContactsPaginatedCollection = require('../collections/contactsPaginated'),
    ContactPageModel = require('../models/contactPage'),
    ContactsPageControlView = require('../views/contactsPageControl');

var AppController = function(options){
    this.initialize.apply(this, arguments);
};

// TODO share the same event bus as views
_.extend(AppController.prototype, Backbone.Events, {
    initialize: function (options) {

        this.eventbus = options.eventbus;
        this.listenTo(this.eventbus, 'page:change', this.pageChanged);


        this.contactPageModel = new ContactPageModel({
            eventbus:this.eventbus
        });

        this.contactsPaginatedCollection = new ContactsPaginatedCollection({
            defaultPageModel: this.contactPageModel,
            eventbus:this.eventbus
        }); 

        this.contactsPageControlView = new ContactsPageControlView({
            model: this.contactPageModel,
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

    pageChanged: function (pageModel) {
        this.contactsPaginatedCollection.fetch({
            reset:true,
            pageModel:pageModel
        });
    },

    pageAction: function(page) {
        var page = page || 0; 
        this.contactsAppView.render();

        function createPageModel (data) {
            this.contactPageModel.set({
                total: data.total,
                items: data.items,
                current: parseInt(page)
            });
        }
        function fetchCollection(data) {
            this.contactsPaginatedCollection.fetch({
                reset:true,
                pageModel:this.contactPageModel
            });
        }
        function showError() {
            this.contactsListView.onError();
        }

        $.ajax({
            url: "http://127.0.0.1:3000/pages",
            success: _.bind(createPageModel, this)
        }
        ).then(_.bind(fetchCollection, this)
        ).fail(_.bind(showError, this));

    }
});


module.exports = AppController;
