describe('ContactListView', function () {
    var contactListView, ContactListView;
    var contactCollection;
    var addStub, reqSpy, errorSpy, resetSpy;
    var model;

    before(function () {
        var proto;

        contactCollection = require('../js/collections/contactsPaginated')({ 
            eventbus: vent
        });

        ContactListView = require('../js/views/contactsList').getClass(); 

        proto = ContactListView.prototype;

        addStub = sinon.stub(proto, 'addNew');
        reqSpy = sinon.spy(proto, 'prerender');
        errorSpy = sinon.spy(proto, 'onError');
        resetSpy = sinon.spy(proto, 'render');

        contactListView = new ContactListView({
            collection: contactCollection,
            eventbus:vent
        })
    
        // testing model -- collection -- view
        // interaction here
        model = require('../js/models/contact')({
            firstName: 'foo'
        });

        contactCollection.add(model);
    })
    
    describe('#initialize', function () {
        it('should call appropriate methods for collection events', function () {
            var col = contactCollection;

            col.trigger('add');
            assert.isTrue(addStub.called);

            col.trigger('request');
            assert.isTrue(reqSpy.called);

            col.trigger('error');
            assert.isTrue(errorSpy.called);

            col.trigger('reset');
            assert.isTrue(resetSpy.called);
        })
    })

    describe('#prerender', function () {
        it('should call wait() on \'request\' events originated only from the collection', function() {

            // NOTE: We're using reqSpy defined from above
            // because event binding is set on initialize
            // in the original code
            
            var waitSpy;
            
            // order matters
            waitSpy = sinon.spy(contactListView, 'wait')
            //model.save({ wait: true })
            model.trigger('request',model);
            assert.isTrue(reqSpy.called)
            assert.isFalse(waitSpy.called)

            contactCollection.trigger('request', contactCollection);
            assert.isTrue(reqSpy.called)
            assert.isTrue(waitSpy.called);

            after(function () {
                //contactCollection.pop();
                contactListView.wait.restore();
            })
        })
    })

    describe('#onError', function () {
        it('should only trigger new \'fetch:error\' event when \'error\' event originates from collection only', function () {
           model.trigger('error', model); 
           triggerSpy = sinon.spy(ContactListView.prototype, 'trigger');

           assert.isTrue(errorSpy.calledTwice);
           assert.isTrue(errorSpy.getCall(1).args[0] === model);
           assert.isFalse(triggerSpy.calledWith('fetch:error'));
        })

    })

    describe('#addNew', function () {
        it ('should keep new view in array and prepend it', function () {
            var proto, spy, contact, jq;
            
            // TODO needs rewrite
            // clear previous stub
            contactListView.addNew.restore();
            
            proto = ContactListView.prototype;
            spy = sinon.spy(contactListView.views, 'push');
            jq = sinon.spy(contactListView, '$');

            contact = require('../js/models/contact')();
            contactListView.addNew(contact);

            assert.isTrue(contactListView.views.length > 0);
            assert.isTrue(spy.called);
            assert.isTrue(jq.calledWith('#contacts-list'));

            after ( function () {
                contactListView.$.restore
            })
        })
    })
    describe('#addAll', function () {
        var sort, each;
        before( function () {
            sort = sinon.spy(contactCollection, 'sort');
            each = sinon.spy(contactCollection, 'each');

            contactListView.addAll();
        })

        it ('should sort collection', function () {
            assert.isTrue(sort.called);
        })
        it ('should add each contact', function () {
            assert.isTrue(each.called); 
        })

        after (function () {
            contactCollection.sort.restore();
            contactCollection.each.restore();
        })
    })
    describe('#render', function () {
        var removeAll, addAll;
        before(function () {
            removeAll = sinon.spy(contactListView, 'removeAll');
            addAll = sinon.spy(contactListView, 'addAll');
            contactListView.render();
        })
        it ('should remove all contacts', function () {
            assert.isTrue(removeAll.called);
        })
        it ('should add all contacts', function () {
            assert.isTrue(addAll.called);
        })
        after( function () {
            contactListView.removeAll.restore();
            contactListView.addAll.restore();
        })
    })
    after(function () {
        contactListView.prerender.restore();
        contactListView.onError.restore();
        contactListView.render.restore();
        contactListView.trigger.restore();
    })

})
