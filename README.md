# Contact manager app

Contact manager Single Page App built with BackboneJS.

### Features
- Create, Read, Update, Delete contacts.
- Load and error state handling.
- Pagination support.
- Decoupled components (CommonJS modules)
  communicating via central event-bus.
- Tested with mocha/sinon/chai.

### Installation
```
npm install -g grunt browserify json-server 
npm install
npm run bundle 
```

To generate and serve mock API just type:
```
npm run server
```

