define([
    'underscore',
    'backbone',
    'text!templates/contact.html'
], function (_, Backbone, contactTemplate) {
    
    var ContactView = Backbone.View.extend({

        template: _.template(contactTemplate),

        tagName: 'div',
        className: 'contact',

        events: {
            'click .contact-delete' : 'removeContact'
        },

        initialize: function () {
            // view will follow model
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },

        removeContact: function (e) {
            this.model.destroy();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }

    });

    return ContactView;

});
