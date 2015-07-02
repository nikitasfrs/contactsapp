var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    contactsContainerTmpl = require('../templates/contactsContainer.html');

'use strict';

var ContactsAppView = Backbone.View.extend({

   template: contactsContainerTmpl,

   initialize: function(options) {
       this.contactsListView = options.contactsListView
       this.pageControlView = options.pageControlView;
       this.contactCreateFormView = options.contactCreateFormView;

       this.eventbus = options.eventbus;
   },


   render: function() {
       this.$el.html(this.template());

       this.contactsListView.setElement(
           this.$('#contacts-container')).wait();

       this.pageControlView.setElement(
            this.$('#contacts-pages')).render(); 

        this.contactCreateFormView.setElement(
            this.$('.create-area')).render();

       return this;
   }
});

module.exports = function createModule(opt){
    return new ContactsAppView(opt);
}

   
