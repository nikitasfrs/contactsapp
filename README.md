# Contact manager app

Contact manager SPA implementation built with Backbone.js, bootstrap-sass.

### Features
- Create, Read, Update, Delete contacts.
- Load and error state handling.
- Pagination support.
- Decoupled components (CommonJS modules) communicating with a central event-bus.
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

