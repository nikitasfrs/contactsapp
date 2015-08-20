var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

var fs = require('fs');
var contactsContainerTmp = fs.readFileSync(__dirname + '/../templates/contactsContainer.html', 'utf8');

'use strict';

var ContactsAppView = Backbone.View.extend({

   template: _.template(contactsContainerTmp),

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
            this.$('#contacts-pages')); 

        this.contactCreateFormView.setElement(
            this.$('.create-area')).render();

       return this;
   }
});

module.exports = function createModule(opt){
    return new ContactsAppView(opt);
}

module.exports.getClass = function () {
    return ContactsAppView;
}
   
