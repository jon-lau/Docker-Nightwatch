/// <reference path="../pages/login.js" />

/*
NAME:  TestLoginModal
DESCRIPTION:  These tests are intended to only test functionality of the
            Login Modal. Testing the specific pages before and after testing
            of the modal functionality should be moved to their specific test file.
NOTES:  -Be aware of the order that you add any additional tests.  The last
        test in this file should be the only test that calls '.end()'.  If
        you intend to append a test to the end of this list please remove
        the '.end()' method from the previous test and add it to your test.
        The function of the '.end()' method not only closes the browser, but it
        also closes the Selenium Web Driver meaning no further tests will run.
        -The reference above is intended to provide JS intellisense.
*/
module.exports = { // adapted from: https://git.io/vodU0
    'Login Incorrect Password Test': function (browser) {
        //login
        var loginPage = browser.page.login().navigate().signIn("admin@revacomm.com", "XXX");
        loginPage.waitForElementVisible("#error-login")
            .assert.containsText("#error-login", "Invalid login attempt.");
    },
    'Test Valid Login Email': function (browser) {
        //login
        var loginPage = browser.page.login().navigate().signIn("JKKL", "");
        loginPage.waitForElementVisible("#Email+ul li")
            .assert.containsText("#Email+ul li", "Please enter a valid email address.");
    },
    'Valid Email Address Forgot Password Test': function (browser) {
        //login
        var loginPage = browser.page.login().navigate().forgotPassword("000");
    },
    'Login as admin@revacomm.com': function (browser) {
        //login
        var loginPage = browser.page.login().navigate().signIn("admin@revacomm.com", "password");
        loginPage.waitForElementVisible("div.top_nav div.nav_menu nav ul")
            .assert.elementPresent("div.top_nav div.nav_menu nav ul")
            .end();
    },
};

