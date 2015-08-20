module.exports = function(markup) {  
  if (typeof document !== 'undefined') return;
  var jsdom = require('jsdom').jsdom;
  global.document = jsdom(markup || '');
  global.window = document.defaultView;
  global.navigator = {
    userAgent: 'node.js'
  };

  global.createEvent = function(ev) {
      var e = window.document.createEvent('UIEvents');
      e.initEvent(ev,true,true);
      return e;
  }

  global.trigger = function(el, ev) {
      var e = createEvent(ev);
      el.dispatchEvent(e);
  } 
};
