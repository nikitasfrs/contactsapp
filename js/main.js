var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var AppRouter = require('./routers/router');
var AppController = require('./controllers/appController');

var vent = _.extend({}, Backbone.Events);
var appController = new AppController({eventbus:vent});
var appRouter = new AppRouter({appController:appController, eventbus:vent});

    
'use strict';
 
Backbone.$ = $;
Backbone.history.start(); 
