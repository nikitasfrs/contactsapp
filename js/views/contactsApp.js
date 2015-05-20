define([
    'jquery',
    'underscore',
    'backbone',
    'views/contactsList',
    'views/contactsResults'
], function ($, _, Backbone, ContactsList, ContactsResults) {
   'use strict';

   var ContactsAppView = Backbone.View.extend({

       template:null,

       initialize: function() {
          this.contactsListView = new ContactsList();
          this.contactsResultView = new ContactsResult();
       },

       render: function() {

       }

   });

   return ContactsAppView;


});
    
