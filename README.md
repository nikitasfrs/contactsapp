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

1. Install dependencies:
```
sudo npm install -g grunt browserify json-server
npm install
npm run bundle 
```

2. Run mock server:
```
npm run server
```

3. Open your browser and visit:
http://127.0.0.1/contactsapp

### Run test suite
```
npm run test
```

