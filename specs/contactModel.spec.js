describe('ContactModel', function(){
    var contactModel;

    before(function(){
        contactModel = require('../js/models/contact')();
    });

    describe('#isValid()', function(){
        it('contact with no first name or last name should not be valid', function(){
            assert.isFalse(contactModel.isValid());
        })
    })

    describe('#validate()', function(){
        it('validate returns string message when saving empty model', function(){
            var spy = sinon.spy(contactModel, "validate");
            
            // save triggers model.validate()
            contactModel.save();

            assert.isString(spy.returnValues[0]);
        })
    })
})
