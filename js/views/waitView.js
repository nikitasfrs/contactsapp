var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    waitTemplate = require('../templates/wait.html');

'use strict';

var WaitView = Backbone.View.extend({
    className: 'wait',
    template: waitTemplate, 

    render: function() {
        this.$el.html(this.template);
        return this;
   }
});

module.exports = function createModule(opt){
    return new WaitView(opt);
}
        
