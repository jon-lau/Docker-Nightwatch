module.exports = {
    url: function() {
        return this.api.launchUrl;
    },
    elements: {
        loginBtn: 'nav .col-xs-1 button',
        userField: "#Email",
        passwordField: "#Password",
        submit: "form input[type=submit][value='Sign In']",
        errorLabel: '#error-login'
    },
    commands: [{
        signIn: function(user = 'user8@seed.net', password = 'Password8') {
            this.waitForElementVisible('body')
                .assert.title('Hawaii DOE | Consultant Portal')
                .waitForElementVisible('@loginBtn')
                .click('@loginBtn');
            this.api.pause(1000);
            this.waitForElementVisible('@userField')
                .setValue('@userField', user);
            this.waitForElementVisible('@passwordField')
                .setValue('@passwordField', password)
                .click('@submit');
            this.api.pause(4000);
            return this.api;
        },
        signOut: function(index = "6") {
                //click user dropdown menu
            this.waitForElementVisible("div.top_nav div.nav_menu nav ul")
                .assert.elementPresent("div.top_nav div.nav_menu nav ul")
                .click("div.top_nav div.nav_menu nav ul")
                //sign out 
                .waitForElementVisible("body div div div.top_nav div nav ul li ul li:last-child a")
                .customClick("body div div div.top_nav div nav ul li ul li:last-child a")
                //wait for page to load
                .waitForElementVisible(".row.homepage-content")
                .customClick(".row.homepage-content");
            return this.api;
        },
        forgotPassword: function(email = 'user8@seed.net') {
            this.waitForElementVisible('body')
                .assert.title('Hawaii DOE | Consultant Portal')
                .waitForElementVisible("#consultant")
                .customClick("#consultant")
                .waitForElementVisible("nav .col-xs-1 button") //sign in button
                .customClick("nav .col-xs-1 button")
                .waitForElementVisible('div.forgot-pwd a')
                .customClick('div.forgot-pwd a')
                .waitForElementVisible("form input[id='ForgotPasswordEmail']")
                .customClick("form input[id='ForgotPasswordEmail']")
                .setValue("form input[id='ForgotPasswordEmail']", email)
                .waitForElementVisible("input[type=submit][value='Email Link']")
                .customClick("input[type=submit][value='Email Link']")
                .assert.containsText("#ForgotPasswordEmail+ul li", "Please enter a valid email address.");
            return this.api;
        },
        registerCompany: function (ssn, firmName) {
            //Enter ssn
            this.waitForElementVisible("#txtFEIN")
                .setValue("#txtFEIN", ssn)
                .waitForElementVisible("#FirmName")
                .setValue("#FirmName", firmName)

                //check for available company types names
                .assert.containsText("#FirmTypeId option:nth-child(1)", "Individual")
                .assert.containsText("#FirmTypeId option:nth-child(2)", "Partnership")
                .assert.containsText("#FirmTypeId option:nth-child(3)", "Corporation")
                .assert.containsText("#FirmTypeId option:nth-child(4)", "Joint Venture")
                .assert.containsText("#FirmTypeId option:nth-child(5)", "Other")
                //check that company types are selectable 
                //select individual
                .waitForElementVisible("#FirmTypeId option:nth-child(1)")
                .click("#FirmTypeId option:nth-child(1)")
                //select partnership
                .waitForElementVisible("#FirmTypeId option:nth-child(2)")
                .click("#FirmTypeId option:nth-child(2)")
                //select corporation
                .waitForElementVisible("#FirmTypeId option:nth-child(3)")
                .click("#FirmTypeId option:nth-child(3)")
                //select Joint Venture
                .waitForElementVisible("#FirmTypeId option:nth-child(4)")
                .click("#FirmTypeId option:nth-child(4)")
                //select other
                .waitForElementVisible("#FirmTypeId option:nth-child(5)")
                .click("#FirmTypeId option:nth-child(5)")
                //click submit
                .waitForElementVisible("#newCompany div div.profile-dropdown-blocks-buttons input")
                .customClick("#newCompany div div.profile-dropdown-blocks-buttons input");
            return this.api;
        },
    }]
};