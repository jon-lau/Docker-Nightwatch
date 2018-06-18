module.exports = {
    url: function () {
        return this.api.launchUrl;
    },
    elements: {
        fstName: '#FirstName',
        lstName: '#LastName',
        mail: '#RegisterEmail',
        pNumber: '#RegisterPhoneNumber',
        pword: '#RegisterPassword',
        cPassword: '#ConfirmPassword',
        termsConditions: '.pmd-checkbox-label',
        robotCheck: '.recaptcha-checkbox-checkmark'
    },
    commands: [{
        firstName: function (fName) {
            this.waitForElementVisible('@fstName')
                .setValue('@fstName', fName);
            return this.api;
        },
        lastName: function (lName) {
            this.waitForElementVisible('@lstName')
                .setValue('@lstName', lName);
            return this.api;
        },
        email: function (eMail) {
            this.waitForElementVisible('@mail')
                .setValue('@mail', eMail);
            return this.api;
        },
        phoneNumber: function (number) {
            this.waitForElementVisible('@pNumber')
                .setValue('@pNumber', number);
            return this.api;
        },
        password: function (pass) {
            this.waitForElementVisible('@pword')
                .setValue('@pword', pass);
            return this.api;
        },
        confirmPassword: function (cPass) {
            this.waitForElementVisible('@cPassword')
                .setValue('@cPassword', cPass);
            return this.api;
        },
        submit: function () {
            this.waitForElementVisible("form input[type=submit][value='Create Account']")
                .customClick("form input[type=submit][value='Create Account']")
                .waitForElementVisible('body')
                .assert.title('Hawaii DOE | Consultant Portal');
            return this.api;
        }
    }]
};