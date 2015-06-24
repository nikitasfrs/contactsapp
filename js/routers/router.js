var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

var AppRouter = Backbone.Router.extend({
    initialize: function (options) {
        this.appController = options.appController; 
        this.eventbus = options.eventbus;
        this.listenTo(this.eventbus, "page:change", this.pageChanged);

    },

    routes: {
        "page/:page":"pageRoute",
        "*path": "defaultRoute"
    },
    pageRoute:function(pageNum) {
        this.appController.pageAction(pageNum);
    },

    defaultRoute: function () {
        this.appController.pageAction();
    },

    pageChanged: function(pageModel) {
        this.navigate('page/' + pageModel.get('current'));
    }

});

module.exports = AppRouter;

