define([
    'jquery',
    'underscore',
    'backbone', 
    'text!templates/contactsPages.html'
], function ($,
             _, 
             Backbone, 
             contactsPagesTmp){
    'use strict';
    // 
    // NOTE: This is a child view of contactList
    //
    var ContactsPageControlView = Backbone.View.extend({

        template: contactsPagesTmp, 

        initialize: function(options) {
            this.router = options.router;
            this.pages = options.pages;
            //this.listenTo(this.model,'change', this.render) 
        }, 

        render: function () {
            // will get currentpage from model 
            // and construct controls
            var items = this.generateItems(),
                tpl = ($('ul', this.template)).append(items);
            this.$el.html(tpl);
            return this;
        },

        events: {
            'click .active': 'doNotFollow' 
        },

        doNotFollow: function(e) {
            e.preventDefault();
        },

        generateItems: function() {
            // builds pagination controls dynamically
            var totalPages = this.model.get('totalPages'),
                currentPage = this.model.get('currentPage'),
                i, str='', li='';

            for (i=0; i < totalPages; i++) {
                if (currentPage === i) {
                    li = '<li class="active"><a href="#" class="pagenum">' + i + '</a></li>';
                } else {
                    li = '<li><a href="#page/' + i + '" class="pagenum">' + i + '</a></li>';
                }
                str=str+li;
            }

            return str; 
        }



    });

    return ContactsPageControlView;
});
