/// <reference path="../pages/register.js" />

/*
NAME:  TestRegisterPage
DESCRIPTION:  These tests are intended to only test functionality of the
              Register Page. Testing the specific pages before and after
              the Register Page functionality should be moved to their
              specific test file.
NOTES:  -Be aware of the order that you add any additional tests.  The last
        test in this file should be the only test that calls '.end()'.  If
        you intend to append a test to the end of this list please remove
        the '.end()' method from the previous test and add it to your test.
        The function of the '.end()' method not only closes the browser, but it
        also closes the Selenium Web Driver meaning no further tests will run.
        -The reference above is intended to provide JS intellisense.
        -If setting multiple fields via their page methods you can't directly
        chain them. Instead you have to preceed each additional Setter Method
        with the reference to the page object. (.page.register())
        -This file does contain a few tests that are testing other pages,
        however they are related to the registration process so it made
        sense to add them to this test subset.
*/
module.exports = { // adapted from: https://git.io/vodU0
    'Valid Phone Number Test': function (browser) {
        var registerPage = browser.page.register().navigate()
            .phoneNumber('000')
            .submit()
            .assert.containsText("#RegisterPhoneNumber+ul li", "Please enter a phone number, including area code.");
    },
    'Valid Password Test': function (browser) {
        var registerPage = browser.page.register().navigate()
            .password('123')
            .submit()
            .assert.containsText("#RegisterPassword+ul li", "Your password must be at least 6 characters.");
    },
    'Valid Email Address Test': function (browser) {
        var registerPage = browser.page.register().navigate()
            .email('000')
            .submit()
            .assert.containsText("#RegisterEmail+ul li", "Please enter a valid email address.");
    },
    'Test Valid Confirm Password': function (browser) {
        var registerPage = browser.page.register().navigate()
            .confirmPassword('123')
            .submit()
            .assert.containsText("#ConfirmPassword+ul li", "Your password does not match.");
    },
    'Test Required Register Fields': function (browser) {
        var registerPage = browser.page.register().navigate().submit();
        registerPage.assert.containsText("#FirstName+ul li", "The first name field is required.")
            .assert.containsText("#LastName+ul li", "The last name field is required.")
            .assert.containsText("#RegisterEmail+ul li", "The email field is required.")
            .assert.containsText("#RegisterPhoneNumber+ul li", "The phone number field is required.")
            .assert.containsText("#RegisterPassword+ul li", "The password field is required.")
            .assert.containsText("#ConfirmPassword+ul li", "The confirm password field is required.")
            .assert.containsText("#parsley-id-multiple-terms", "This field is required.")
    },
    'Valid Match Confirm Password Test': function (browser) {
        //set password and confirm password with diff text
        var registerPage = browser.page.register().navigate().password('12345678');
        registerPage.page.register().confirmPassword('87654321')
            .submit()
            .assert.containsText("#ConfirmPassword+ul li", "Your password does not match.")
        .end()
    },
    /*
      the following tests are executed on the page after a user is registered however, it made
      sense for them to line in the register page test file
    */
    'Test Valid Register Company': function (browser) {
        //login
        var loginPage = browser.page.login().navigate().signIn("user2@seed.net", "Password2");
        browser.pause(2000);
        //enter company ssn
        loginPage.page.login().registerCompany("861-36-2791", "")//random ssn that should be open
            //assert error message
            .waitForElementVisible("#parsley-id-7")
            .assert.containsText("#parsley-id-7", "The company name field is required.")
            .end();
    }
};

