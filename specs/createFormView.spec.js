describe('ContactCreateFormView', function () {
   var formView
     , FormView
     , vent;

   before( function () {
       vent = _.extend({}, Backbone.Events);
       FormView = require('../js/views/contactCreateForm').getClass();
       formView = new FormView({
           eventbus: vent
       });
       // render() saves dom contents
       formView.render();

       // demo data
       formView.$('#firstName').val('foo');
       formView.$('#lastName').val('foo');
       formView.$('#phone').val('foo');
       formView.$('#email').val('foo');
   })

   describe('#createNew', function () {
       it('should trigger \'contact:create\' passing a contact object', function () {
           var trigger = sinon.spy(vent, 'trigger');
           var obj;
           
           formView.createNew();

           assert.isTrue(trigger.called);
           assert.isTrue(trigger.calledWith('contact:create'));
           obj = trigger.getCall(0).args[1];
           assert.isTrue(obj.firstName === 'foo')
           assert.isTrue(obj.lastName === 'foo')
           assert.isTrue(obj.phone === 'foo')
           assert.isTrue(obj.email === 'foo')

           after( function () {
               vent.trigger.restore();
           })
       })
   })

   describe('#clear', function () {
       it('should rerender form', function () {
           var render = sinon.spy(formView, 'render');

           formView.clear();
           assert.isTrue(render.called);
           after( function () {
               formView.render.restore();
           })
       })
   })
   describe('#render', function () {
       it('should append template', function() {
           var html = sinon.spy(formView.$el, 'html');
           formView.render();
           assert.isTrue(html.calledWith(formView.template));
           after( function () {
               formView.$el.html.restore();
           })
       })
       it('should store form selectors', function () {
           formView.render();

           assert.isTrue(formView.hasOwnProperty('$firstName'));
           assert.isTrue(formView.hasOwnProperty('$lastName'));
           assert.isTrue(formView.hasOwnProperty('$phone'));
           assert.isTrue(formView.hasOwnProperty('$email'));
       })
   })
})
