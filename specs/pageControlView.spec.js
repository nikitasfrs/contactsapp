describe('PageControlView', function () {
    var pageControlView
      , PageControlView
      , pageModel
      , proto
      , renderSpy;
    before(function () {
        var init;
        pageModel = require('../js/models/page')({
            eventbus: vent
        });

        PageControlView = require('../js/views/pageControl').getClass();

        proto = PageControlView.prototype;

        // should be placed before instantiation
        renderSpy = sinon.spy(proto, 'render');

        pageControlView = new PageControlView({ 
            eventbus: vent,
            model: pageModel 
        });
    })
    describe('#initialize', function () {
        it('should call render on \'change\' model event', function () {
            pageModel.trigger('change');
            assert.isTrue(renderSpy.called);
        })
    })
    describe('#render', function () {
        it('should place page content into the list', function () {
            var generateItems = sinon.stub(pageControlView, 'generateItems');
            var html = sinon.stub(pageControlView.$el, 'html');
            pageControlView.render();
            assert.isTrue(generateItems.called);
            assert.isTrue(html.called);
        })
        after(function () {
            pageControlView.generateItems.restore();
            pageControlView.$el.html.restore();
        })
    })
    describe('#goToPage', function () {
        var ebTrigger;
        before( function () {
            var e = {
                target: {
                    text: 999 
                },
                preventDefault: function () {
                    return true;
                }
            };
            ebTrigger = sinon.spy(vent, 'trigger');
            pageControlView.goToPage(e)
        })
        it ('should set current page in model', function () {
           assert.isTrue(pageControlView.model.get('current') === 999);
        })
        it ('shoud trigger \'page:change\' eventbus event', function () {
            assert.isTrue(ebTrigger.calledWith('page:change'));
            assert.isTrue(true)
        })
        after(function () {
            vent.trigger.restore();
        })
    })
    describe('#generateItems', function () {
        var str;
        before(function(){
            pageModel.set({
                current: 4,
                items: 5,
                total: 10
            });
            str = pageControlView.generateItems();
        })
        it('should generate 12 valid html elements for current page: 4, itemsPerPage: 5, totalItems: 10', function () {
            
            // prev,next + 9 elements between 
            // 0-indexed 
            assert.isTrue($(str).length === 12);
        })
    })
    describe('#doNotFollow', function () {
        var doNotFollow;
        var preventDefault;
        before( function () {
            var event = createEvent('foo');
            preventDefault = sinon.spy(event, 'preventDefault');
            doNotFollow = pageControlView.doNotFollow(event);
        })

        it('should call preventDefault to passed event and return false', function () {
            assert.isTrue(preventDefault.called);
            assert.isFalse(doNotFollow);
        })
    })
    
})
        
