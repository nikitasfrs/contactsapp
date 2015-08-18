var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore')
    
var AppController = function(options){
    this.initialize.apply(this, arguments);
};

// TODO share the same event bus as views
_.extend(AppController.prototype, Backbone.Events, {
    initialize: function (options) {

        this.eventbus = options.eventbus;
        this.listenTo(this.eventbus, 'page:change', this.fetchPageContacts);

        this.pageModel = require('../models/page')({
            eventbus:this.eventbus
        });

        this.contactsPaginatedCollection =  require('../collections/contactsPaginated')({
            eventbus:this.eventbus
        }); 

        this.pageControlView = require('../views/pageControl')({
            model: this.pageModel,
            eventbus:this.eventbus
        });
        
        this.contactsListView =  require('../views/contactsList')({
            collection: this.contactsPaginatedCollection,
            eventbus:this.eventbus
        });

        this.contactCreateFormView = require('../views/contactCreateForm')({
            //router:router,
            eventbus:this.eventbus
        });
        
        this.contactsAppView = require('../views/contactsApp')({
            el: '#contacts-app',
            contactsListView: this.contactsListView,
            pageControlView: this.pageControlView,
            contactCreateFormView: this.contactCreateFormView,
            eventbus:this.eventbus
        });
    },

    fetchPageContacts: function (pageModel) {
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
        
        var fetchPageContacts = _.bind(function(data) {
            this.fetchPageContacts(this.pageModel);
        },this);

        var showError = _.bind(function() {
            this.contactsListView.onError();
        },this);

        this.contactsAppView.render();

        return $.ajax({
            url: "http://127.0.0.1:3000/pages",
            success: createPageModel
        })
        .then(fetchPageContacts)
        .fail(showError);

    }
});

module.exports = function (opt) {
    return new AppController(opt);
}

module.exports.getClass = function () {
    return AppController;
}
