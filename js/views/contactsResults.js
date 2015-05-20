define([
    'jquery',
    'underscore',
    'backbone', 
    'collections/contacts'
], function ($, _, Backbone, ContactView){
    'use strict';

    var ContactsResultsView = Backbone.View.extend({

        template:null,
        events: {
            'click #searchContact': 'searchContact'
        },

        initialize: function() {

        },

        render: function() {
            return this;
        },

        searchContact: function() {
            var query = this.$searchInput.val();
            if (query) {
                this.collection.fetch({
                    url: "http://127.0.0.1:3000/contacts?firstName=" + query,
                    reset: true
                })
            }
        }

    });

    return ContactsResultsView;

});

