var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

var AppRouter = Backbone.Router.extend({
    initialize: function (options) {
        this.appController = options.appController; 
        this.eventbus = options.eventbus;

        this.listenTo(this.eventbus, "page:change", this._changePage);

    },

    routes: {
        "page/:page":"pageRoute",
        "*path": "pageRoute" // Default 
    },

    pageRoute:function(pageNum) {
        return this.appController.setupPageAction(pageNum);
        
    },

    _changePage: function(pageModel) {
        this.navigate('page/' + pageModel.get('current'));
    }

});

module.exports = function (opt) {
    return new AppRouter(opt) 
}

module.exports.getClass = function () {
    return AppRouter;
}


