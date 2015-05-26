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

        events: {
            'click .pagenum': 'goToPage'
        },

        goToPage: function(e) {
            e.preventDefault();
            var page = $(e.target).text();

            // update router
            this.router.navigate('page/' + page, { trigger: true });
            // update pages ui: make current page num
            // bold, check if last/first etc
            // will update pages model as well
        },

        render: function () {
            // will get currentpage from model 
            // and construct controls
            var items = this.generateItems(),
                tpl = ($(this.template)).append(items);
            this.$el.html(tpl);
            return this;
        },

        generateItems: function() {
            // builds pagination controls dynamically
            var totalPages = this.model.get('totalPages'),
                currentPage = this.model.get('currentPage'),
                i, str='', li='';

            for (i=0; i < totalPages; i++) {
                if (currentPage === i) {
                    li = '<li class="active"><a href="#" class="pagenum">' + i + '</li></a>';
                } else {
                    li = '<li><a href="#" class="pagenum">' + i + '</li></a>';
                }
                str=str+li;
            }

            return str; 
        }



    });

    return ContactsPageControlView;
});
