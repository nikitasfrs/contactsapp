var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

var AppRouter = Backbone.Router.extend({
    initialize: function (options) {
        this.appController = options.appController; 
        this.eventbus = options.eventbus;

        this.listenTo(this.eventbus, "page:change", this.changePage);

    },

    routes: {
        "page/:page":"pageRoute",
        "*path": "pageRoute"
    },

    pageRoute:function(pageNum) {
        this.appController.setupPageAction(pageNum);
    },

    changePage: function(pageModel) {
        this.navigate('page/' + pageModel.get('current'));
    }

});

module.exports = function createModule(opt){
    return new AppRouter(opt);
}

