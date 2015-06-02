module.exports = function() {
    var faker = require("faker");
    var _ = require("lodash");

    return {
        contacts:   _.times(100, function(n) {
            return {
                id:n,
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                phone: faker.phone.phoneNumber(),
                email: faker.internet.email()
            }
        }),
        pages: { total:10, items:10 }
    }
}
