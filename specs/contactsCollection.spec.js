describe('ContactsCollection', function(){
    var pageModel, contactsCollection;

    before(function(){ 
        pageModel = require('../js/models/page')({
            total: 10,
            current: 0,
            items: 5
        });
        contactsCollection = require('../js/collections/contactsPaginated')({
            defaultPageModel: pageModel
        });
    })

    describe('#_getRequestUrl()', function() {
        it('should generate url params 0 .. 5', function(){
           assert.equal(contactsCollection._getRequestUrl('', pageModel), '?_start=0&_end=5'); 
        })
    })

    describe('#create()', function() {
        it('should emit "contacts:duplicate" event on duplicates', function() {
            var contactAttributes = ({
                firstName: 'FirstName',
                lastName: 'LastName'
            });

            var spy = sinon.spy(contactsCollection, 'trigger');
            contactsCollection.create(contactAttributes);
            contactsCollection.create(contactAttributes);

            expect(spy.calledWith('contacts:duplicate')).to.be.true;
            
        })
    })

    after(function() {
        contactsCollection.trigger.restore();
    })
    
})
