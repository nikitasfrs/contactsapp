var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    ContactView = require('./contact'),
    ContactModel = require('../models/contact');
   
var fs = require('fs');
var contactCreateFormTmp = fs.readFileSync(__dirname + '/../templates/contactCreateForm.html', 'utf8');

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

    initialize: function(options) {
        this.eventbus = options.eventbus;
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

        this.eventbus.trigger('contact:create', {
            firstName: this.$firstName.val(),
            lastName: this.$lastName.val(),
            phone: this.$phone.val(),
            email: this.$email.val()  
        });
    },

    clear: function(e) {
        e.preventDefault();
        this.render();
    }

});

module.exports = function createModule(opt) {
    return new ContactCreateFormView(opt);
}

module.exports.getClass = function () {
    return ContactCreateFormView;
}
