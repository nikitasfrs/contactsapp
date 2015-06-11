var $ = require('jquery'),
    Backbone = require('backbone'),
    AppRouter = require('./routers/router'),
    router = new AppRouter();

'use strict';

Backbone.$ = $;
Backbone.history.start();
