describe('AppController', function() {
    var appController;
    var vent;

    before(function() {
        vent = _.extend({}, Backbone.Events);
        // TODO: monkey-patch initialize to add
        // spy on fetchPageContacts 
        // alter module export pattern to include
        // a reference to the initial object and not
        // the instance as well?
        //
        appController = require('../js/controllers/appController').createModule({
            eventbus: vent
        });

    });

    describe('#initialize', function() {
        var spy;

        before(function() {
            AppController = require('../js/controllers/appController').getClass();
            var init = AppController.prototype.initialize;
            AppController.prototype.initialize = function(options) {
                
                // spy should be set here before event
                // binding to get proper function
                spy = sinon.spy(this,'fetchPageContacts');
                init.apply(this, arguments);
            }

            appController = new AppController ({
                eventbus: vent
            })
        })

        it('should call fetchPageContacts() on "page:change" event', function() {
            vent.trigger('page:change');
            assert.isTrue(spy.called);            
        })

        after(function() {
            appController.fetchPageContacts.restore();
        })

    })

    describe('#fetchPageContacts', function() {
        it('should fetch contacts', function() {

            var spy=sinon.spy(appController.contactsPaginatedCollection, 'fetch');
            appController.fetchPageContacts();
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
