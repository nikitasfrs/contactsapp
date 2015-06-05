define([
    'jquery',
    'underscore',
    'backbone'
], function (
    $,
    _,
    Backbone) {
   'use strict';

   var ContactsAppView = Backbone.View.extend({

       template:null,

       initialize: function(options) {
           this.contactsListView = options.contactsListView
           this.contactsResultView = options.contactsResultView;
           this.contactCreateFormView = options.contactCreateFormView;
           this.$contacts=$('.contacts');
       },

       render: function() {

           this.$contacts.html = this.contactsListView.prerender().el;
           this.$('.create-area').append(this.contactCreateFormView.render().el);

           this.$el.show();
           return this;
       }


   });

   return ContactsAppView;


});
    
