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

Install dependencies:
```
sudo npm install -g grunt browserify json-server
npm install
npm run bundle 
```
Run mock server:
```
npm run server
```
Open your browser and visit:
http://127.0.0.1/contactsapp

### Run test suite
```
npm run test
```

