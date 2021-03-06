# Contact manager app

Contact manager Single Page App built with BackboneJS.

### Features
- Create, Read, Update, Delete contacts.
- Load and error state handling.
- Pagination support.
- Decoupled components (CommonJS modules)
  communicating via central event-bus.
- Tested with mocha/sinon/chai.

### Install

1. Install dependencies:
    ```
    sudo npm install -g grunt browserify json-server
    npm install
    ```

2. Build javascript bundle:
    ```
    npm run bundle
    ```

3. Run mock server with fake data:
    ```
    npm run server
    ```

4. Open your browser and visit http://127.0.0.1/contactsapp

### Test
To run test suits just type: 
```
npm run test
```

