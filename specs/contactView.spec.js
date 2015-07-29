describe('contactView', function() {
    var contactView;
    
    before(function(){
        contactView = require('../js/views/contact')();
    })

    describe('#onSync', function(){
        it('should trigger contact:change and call render', function(){
            var triggerspy = sinon.spy(contactView, 'trigger');
            var renderspy = sinon.spy(contactView,'render'); 
            //assert.isTrue(false);

            //assert.isTrue(false);
            /*contactView.onSync();

            assertTrue(triggerspy.calledWith('contact:change'));
            assertTrue(renderspy.called)

            contactView.trigger.restore(); */

        })
    })

})
