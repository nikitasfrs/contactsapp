describe('Router', function () {
    var router;
    var pageModel;

    describe('#initialize', function() {
        var spy;
        before(function () {
            var Router = require('../js/routers/router').getClass();
            var init = Router.prototype.initialize;
            Router.prototype.initialize = function(options) {
                spy = sinon.spy(this, '_changePage'); 
                init.apply(this, arguments); 
            }
            router = new Router({ eventbus: vent })
            pageModel = require('../js/models/page')({
                eventbus:vent 
            });
        })
        it('changePage should be called with a pageModel on \'page:change\' event', function () {
            vent.trigger('page:change', pageModel);
            assert.isTrue(spy.called);
        })
        after(function () {
            router._changePage.restore();
        })
    })


})
