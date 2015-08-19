describe('AppController', function() {
    var appController;
    var pageModel;

    describe('#initialize', function() {
        var stub;

        before(function() {
            var proto;

            pageModel = require('../js/models/page')({
                eventbus: vent
            })
            pageModel.set({
                total: 1,
                items: 1,
                current: 1
            })

            AppController = require('../js/controllers/appController').getClass();
            proto = AppController.prototype;
            stub = sinon.stub(proto, 'fetchPageContacts');

            appController = new AppController ({
                eventbus: vent
            })
        })

        it('should call fetchPageContacts() on "page:change" event', function() {
            vent.trigger('page:change');
            assert.isTrue(stub.called);            
        })

        after(function() {
            appController.fetchPageContacts.restore();
        })

    })

    describe('#fetchPageContacts', function() {
        it('should fetch contacts', function() {

            var spy=sinon.spy(appController.contactsPaginatedCollection, 'fetch');
            appController.fetchPageContacts(pageModel);
            assert.isTrue(spy.called);

            after(function() {
                appController.contactsPaginatedCollection.fetch.restore();
            })
        })
    })

    describe('#setupPageAction', function() {
       // creates page model via ajax request
       // fetches contacts for page model on success
       // calls showError callback on error
       
       it('should show contactlistview error on error', function() { 

           var spy = sinon.spy(appController.contactsListView, 'onError');
           sinon.stub($,'ajax').returns($.Deferred().reject());
           appController.setupPageAction(0);
           assert.isTrue(spy.called);
           
           after(function() {
               appController.contactsListView.onError.restore();
           })

       })

       it('should fetch page contacts on success', function() {
         var spy = sinon.spy(appController,'fetchPageContacts');

         sinon.stub($, 'ajax').returns($.Deferred().resolve());
         appController.setupPageAction(0);
         assert.isTrue(spy.called);
         after(function() {
             appController.fetchPageContacts.restore();
         })
       })

       afterEach(function() {
           $.ajax.restore();
       })
       
     })
})
