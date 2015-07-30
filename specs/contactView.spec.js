describe('contactView', function() {
    var contactView
      , contactModel;
    
    before(function(){

        contactModel = require('../js/models/contact')()
        contactView = require('../js/views/contact')({
            model: contactModel
        });
    })

    describe('#onSync', function(){
        it('should emit \'contact:change\' and call render', function(){
            var triggerspy = sinon.spy(contactView, 'trigger');
            var renderspy = sinon.spy(contactView,'render'); 
            contactView.onSync();

            assert.isTrue(triggerspy.calledWith('contact:change'));
            assert.isTrue(renderspy.called)

            //assert.isTrue(false);
            contactView.trigger.restore(); 
        })
    })

    describe('#removeContact', function() {
        it('should destroy model', function() {
            var modelspy = sinon.spy(contactView.model, 'destroy');
            contactView.removeContact();
            assert.isTrue(modelspy.called);

            contactView.model = contactModel;
        })
    })

})
