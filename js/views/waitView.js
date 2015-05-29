define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/wait.html'
], function ($,
             _, 
             Backbone,
             waitTemplate){
    'use strict';

    var WaitView = Backbone.View.extend({
        className: 'wait',
        template: waitTemplate, 

        render: function() {
            this.$el.html(this.template);
            return this;
       }
    });

    return WaitView;
 });
        
