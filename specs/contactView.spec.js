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

            contactView.trigger.restore(); 
        })
    })

    describe('#removeContact', function() {
        it('should destroy its associated model', function() {
            var modelspy = sinon.spy(contactView.model, 'destroy');
            contactView.removeContact();
            assert.isTrue(modelspy.called);

            contactView.model = contactModel;
        })
    })

    describe('#editContact', function() {
        it('should edit element selector html', function() {
           var spy = sinon.spy(contactView.$el, 'html');
           contactView.editContact();
           assert.isTrue(spy.called);

           contactView.$el.html.restore();
        })
    })

    describe('#saveContact', function() {
        it('should set attrs and save model', function () {
            var setSpy = sinon.spy(contactView.model, 'set');
            var saveSpy = sinon.spy(contactView.model, 'save');
            contactView.saveContact();
            assert.isTrue(setSpy.called);
            assert.isTrue(saveSpy.called);
        })
    })


})
