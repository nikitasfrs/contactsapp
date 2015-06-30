var ContactsCollection = require('../js/collections/contactsPaginated');
var PageModel = require('../js/models/page');

describe('ContactsCollection', function(){
    var pageModel, contactsCollection;

    before(function(){ 
        pageModel = new PageModel({
            eventbus:null,
            total: 10,
            current: 0,
            items: 5
        });
        contactsCollection = new ContactsCollection({
            defaultPageModel: pageModel    
        });
    })

    describe('#_getRequestUrl()', function() {
        it('should return url with params 0 .. 5', function(){
           assert.equal(contactsCollection._getRequestUrl('', pageModel), '?_start=0&_end=5'); 
        })
    })
})
