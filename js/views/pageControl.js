var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

var fs = require('fs');
var pagesTmp = fs.readFileSync(__dirname + '/../templates/pages.html', 'utf8');
   
'use strict';

var PageControlView = Backbone.View.extend({

    template: _.template(pagesTmp), 

    initialize: function(options) {
        this.eventbus = options.eventbus;
        this.listenTo(this.model,'change', this.render) 
    }, 

    render: function () {
        var items = this.generateItems();
        var tpl = ($('ul', this.template())).html(items);
        this.$el.html(tpl);
        return this;
    },

    events: {
        'click .selected': 'doNotFollow',
        'click .pagenum':'goToPage'
    },


    goToPage: function(e) {
        var page = e.target.text;
        e.preventDefault();  

        this.model.set({current: page});
        this.eventbus.trigger("page:change", this.model);

    },

    doNotFollow: function(e) {
        e.preventDefault();
        return false;
    },

    generateItems: function() {
        // builds pagination controls dynamically
        var totalPages = parseInt(this.model.get('total')),
            currentPage = parseInt(this.model.get('current')),
            i, str='', li='';

        if (currentPage > 0) {
            // show prev
            str = '<li><a href="#page/' + (currentPage-1) + '" aria-label="Previous">' +
                '<span aria-hidden="true">&laquo;</span>' +
                '</a></li>';
        }

        for (i=0; i < totalPages; i++) {
            if (currentPage === i) {
                li = '<li class="active"><a href="#" class="selected">' + i + '</a></li>';
            } else {
                li = '<li><a href="#page/' + i + '" class="pagenum">' + i + '</a></li>';
            }
            str=str+li;
        }

        if (currentPage < totalPages-1) {
           // show next
           str += '<li><a href="#page/' + (currentPage+1) + '" aria-label="Previous">' +
                '<span aria-hidden="true">&raquo;</span>' +
                '</a></li>';
        }

        return str; 
    }
});

module.exports = function createModule(opt) {
    return new PageControlView(opt);
}

module.exports.getClass = function () {
    return PageControlView;
}
