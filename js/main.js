var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var vent = _.extend({}, Backbone.Events);

var appController = require('./controllers/appController')({
    eventbus: vent
});

var appRouter =  require('./routers/router')({
    appController: appController,
    eventbus: vent
});
    
'use strict';
 
Backbone.$ = $;
Backbone.history.start(); 
