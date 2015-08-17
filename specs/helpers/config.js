var chai = require('chai');
var sinon = require('sinon');
require('./testdom')('<html><body></body></html>');

global.$ = require('jquery');
global.Backbone = require('backbone');
global.Backbone.$ = global.$;
global._ = require('underscore');

chai.config.includeStack = true;

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;
global.sinon = sinon;

global.vent = _.extend({}, Backbone.Events);
