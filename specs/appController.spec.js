describe('AppController', function() {
    var appController;

    before(function() {
        var vent = _.extend({}, Backbone.Events);
        appController = require('../js/controllers/appController')({
            eventbus: vent
        });
    });

    describe('#fetchPage', function() {
        it('should fetch contacts', function() {
            var spy=sinon.spy(appController.contactsPaginatedCollection, 'fetch');
            appController.fetchPage();
            assert.isTrue(spy.called);
        })

        after(function() {
            appController.contactsPaginatedCollection.fetch.restore();
        })
    })

    describe('#setupPageAction', function() {
        
    })
})
