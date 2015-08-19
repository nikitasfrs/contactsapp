var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    WaitView = require('./waitView');

var fs = require('fs');
var contactsListContainerTmp = fs.readFileSync(__dirname+'/../templates/contactsListContainer.html', 'utf8');

    'use strict';

var ContactsListView = Backbone.View.extend({
    template: _.template(contactsListContainerTmp),

    initialize: function(options) {
        this.waitView = new WaitView();
        this.views = [];

        this.listenTo(this.collection, 'add', this.addNew);
        this.listenTo(this.collection, 'request', this.prerender);
        this.listenTo(this.collection, 'error', this.onError);
        this.listenTo(this.collection, 'reset', this.render);
        this.eventbus = options.eventbus;

    },

    prerender: function() {

        var origin = arguments[0];
        if (origin === this.collection || !origin){
            return this.wait();
        }
        
        return this;
    },

    wait: function() {
        this.$el.html(this.waitView.render().el);
        return this;
    },
    
    render: function() {

        this.$el.html(this.template());
        this.removeAll();
        this.addAll();

        return this;
    },

    onError: function() {
        var origin = arguments[0];
        if (origin === this.collection || !origin){
            this.trigger('fetch:error');
            this.$el.html("<div class='error'><h3>Could not load content</h3><p>Please check your connection status.</p></div>");
        }

        return this;

    },

    addNew: function(contact) {

        // keep track of children
        var view = require('./contact')({
            model: contact 
        });

        this.views.push(view);
        this.$('#contacts-list').prepend(view.render().el);
    },

    addAll: function () {
        this.collection.sort();
        this.collection.each(this.addNew, this);
    },

    removeAll: function () {
        while (this.views.length > 0) {
            this.views.pop().remove();
        }
    }
});

module.exports = function createModule(opt) {
    return new ContactsListView(opt);
}

module.exports.getClass = function () { 
    return ContactsListView;
}

