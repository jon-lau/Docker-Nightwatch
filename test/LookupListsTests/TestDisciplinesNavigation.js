
module.exports = { // adapted from: https://git.io/vodU0
    'Navigate to Disciplines': function (browser) {
        browser
        .url(browser.globals.host)
            .waitForElementVisible('body', 1000)
            .assert.title('Hawaii DOE | Consultant Portal')
            //Login
            //click login button
            .waitForElementVisible("nav .col-xs-1 button", 1000)
            .click("nav .col-xs-1 button")
            //input email field
            .waitForElementVisible("form input[name='Email']", 1000)
            //click email field
            .click("form input[name='Email']")
            .waitForElementVisible("input[name='Email']", 1000)
            //input email field
            .setValue("input[name='Email']", "admin@revacomm.com")
            //input password field
            .waitForElementVisible("input[name='Password']", 1000)
            .setValue("input[name='Password']", "password")
            //click logout button
            .waitForElementVisible("form input[type=submit][value='Log in']", 1000)
            .click("form input[type=submit][value='Log in']")
            //click disciplines
            .waitForElementVisible("#admin-sidebar-menu div:nth-child(3) ul div:nth-child(1) div li a", 5000)
            .click("#admin-sidebar-menu div:nth-child(3) ul div:nth-child(1) div li a")
            .assert.elementPresent("div.right_col h2")
            .end();
    },
};