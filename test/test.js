var assert = require('chai').assert
var ContactsCollection = require('../js/collections/contactsPaginated');

var PageModel = require('../js/models/page');

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})

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
