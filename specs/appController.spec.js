describe('AppController', function() {
    var appController;

    before(function() {
        var vent = _.extend({}, Backbone.Events);
        appController = require('../js/controllers/appController')({
            eventbus: vent
        });
    });

    describe('#fetchPageContacts', function() {
        it('should fetch contacts', function() {

            var spy=sinon.spy(appController.contactsPaginatedCollection, 'fetch');

            appController.fetchPageContacts();

            assert.isTrue(spy.called);
        })

        after(function() {
            appController.contactsPaginatedCollection.fetch.restore();
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
