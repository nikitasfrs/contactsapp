define([
    'jquery',
    'underscore',
    'backbone', 
    'views/contact',
    'text!templates/contactCreateForm.html'
], function ($,
             _, 
             Backbone, 
             ContactView, 
             contactCreateFormTmp){
    'use strict';

    var ContactCreateFormView = Backbone.View.extend({
        tagName: "div",
        className: "contact-create-form",
        template: contactCreateFormTmp,
        
        // delegated events
        events: {
            'click #saveContact': 'createNew',
            'click #clearCreateForm' : 'clear'
        },

        initialize: function() {

        },

        render: function() {
            this.$el.html(this.template);

            // cache selectors
            this.$firstName = this.$('#firstName');
            this.$lastName = this.$('#lastName');
            this.$phone = this.$('#phone');
            this.$email = this.$('#email');

            return this;
        },

        createNew: function(e) {

            this.collection.create({
                firstName: this.$firstName.val(),
                lastName: this.$lastName.val(),
                phone: this.$phone.val(),
                email: this.$email.val(),
                order: this.collection.nextOrder()
            }, {wait: true});
            
        },

        clear: function(e) {
            e.preventDefault();
            this.render();
        }
    
    });

    return ContactCreateFormView;
});
