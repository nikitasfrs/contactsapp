define([
    'underscore',
    'backbone',
    'text!templates/contact.html',
    'text!templates/editContact.html'
], function (
    _, 
    Backbone,
    contactTemplate,
    editContactTemplate) {
    
    var ContactView = Backbone.View.extend({

        template: _.template(contactTemplate),
        editTemplate: _.template(editContactTemplate),

        tagName: 'div',
        className: 'contact',

        events: {
            'click .contact-delete' : 'removeContact',
            'click .contact-edit' : 'editContact',
            'click .contact-cancel' : 'cancelEditing',
            'click .contact-save' : 'saveContact'
        },

        initialize: function () {
            // view will follow model
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);

            this.listenTo(this.model, 'request', this.onRequest);
            this.listenTo(this.model, 'sync', this.onSync);
            this.listenTo(this.model, 'error', this.onError);
        },

        onRequest: function() {
            // wait--loading view
        },

        onSync: function () {
            // notify parent of successful update
            
            this.trigger('change');
        },

        onError: function () {
            // error view or delegate to parent
            this.trigger('error');
        },

        removeContact: function (e) {
            this.model.destroy();
        },

        editContact: function(e) {
           this.$el.html(this.editTemplate(this.model.toJSON())); 
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
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return ContactView;

});
