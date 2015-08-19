var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

var fs = require('fs');
var waitTemplate = fs.readFileSync(__dirname + '/../templates/wait.html', 'utf8');

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

module.exports.getClass = function () {
    return WaitView;
}
        
