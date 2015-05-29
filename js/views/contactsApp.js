define([
    'jquery',
    'underscore',
    'backbone',
    'views/contactsList',
    'views/contactsResults'
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

           this.listenTo(this.contactsListView, 'fetch:error', this.listViewError);
       },

       events: {
           
       },

       listViewError: function() {
           // handle server list error
           // message behaviour here
       },

       render: function() {
           this.$el.append(this.contactsListView.render().el);
           this.$('.create-area').append(this.contactCreateFormView.render().el);

           this.$el.show();
       }


   });

   return ContactsAppView;


});
    
