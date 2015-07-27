var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    contactTemplate = require('../templates/contact.html'),
    editContactTemplate = require('../templates/editContact.html');

var ContactView = Backbone.View.extend({

    tagName: 'div',
    className: 'contact',

    events: {
        'click .contact-delete' : 'removeContact',
        'click .contact-edit' : 'editContact',
        'click .contact-cancel' : 'cancelEditing',
        'click .contact-save' : 'saveContact'
    },

    initialize: function () {
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'request', this.onRequest);
        this.listenTo(this.model, 'sync', this.onSync);

    },

    onRequest: function() {
        this.$el.html("Loading please wait..."); 
    },

    onSync: function () {
        this.trigger('contact:change');
        this.render();
    },

    onError: function () {
        this.$el.html("error");
    },

    removeContact: function (e) {
        this.model.destroy();
    },

    editContact: function(e) {
       this.$el.html(editContactTemplate(this.model.toJSON())); 
    },

    cancelEditing: function (e) {
        return this.render();
    },

    saveContact: function (e) {
        var formData = {};
        var onSuccess;
        this.$el.find('input').each( function (idx, el) {
            // trim 'contact-' class prefix
            var prop = $(el).attr("class").substring(8);
            formData[prop] = $(el).val();
        });
        this.model.set(formData);

        this.model.save({wait: true});
    },
        
    render: function () {
        this.$el.html(contactTemplate(this.model.toJSON()));
        return this;
    }

});

module.exports = function createModule(opt){
    return new ContactView(opt);
}

