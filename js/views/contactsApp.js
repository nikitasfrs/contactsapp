define([
    'jquery',
    'underscore',
    'backbone',
    'views/contactsList',
    'views/contactsResults',
], function (
    $,
    _,
    Backbone, 
    ContactsList,
    ContactsResults) {
   'use strict';

   var ContactsAppView = Backbone.View.extend({

       template:null,

       initialize: function(options) {
           this.contactsListView = options.contactsListView
           this.contactsResultView = options.contactsResultView;
           this.contactCreateFormView = options.contactCreateFormView;
           this.$contacts=$('.contacts');

       },

       events: {
           
       },

       render: function() {

           this.$contacts.html(this.contactsListView.prerender().el);

           this.$('.create-area').append(this.contactCreateFormView.render().el);

           this.$el.show();
           return this;
       }


   });

   return ContactsAppView;


});
    
