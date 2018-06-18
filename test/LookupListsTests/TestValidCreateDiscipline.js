
module.exports = { // adapted from: https://git.io/vodU0
    'Create Discipline in Admin': function (browser) {
        browser
        .url(browser.globals.host)
            .waitForElementVisible('body', 1000)
            .assert.title('Hawaii DOE | Consultant Portal')
//log in
     .waitForElementVisible(".row.homepage-content", 1000)
     .click(".row.homepage-content")
     .waitForElementVisible("nav .col-xs-1 button", 1000) //sign in button
     .click("nav .col-xs-1 button")
     .waitForElementVisible("form input[name='Email']", 1000)
     .click("form input[name='Email']")
     .waitForElementVisible("input[name='Email']", 1000)
     .setValue("input[name='Email']", "admin@revacomm.com")
     .waitForElementVisible("input[name='Password']", 1000)
     .setValue("input[name='Password']", "password")
     .waitForElementVisible("form input[type=submit][value='Log in']", 1000)
     .click("form input[type=submit][value='Log in']")
//create discipline
     .waitForElementVisible("div:nth-child(3) ul div:nth-child(1) div li a", 1000) //disciplines
     .click("div:nth-child(3) ul div:nth-child(1) div li a")
     .waitForElementVisible("div.right_col div div.page-with-table-button a", 1000) //create new
     .click("div.right_col div div.page-with-table-button a")
     .waitForElementVisible("form input[name='Title']", 1000)

     .waitForElementVisible("input[type=submit][value='Create']", 1000)
     .click("input[type=submit][value='Create']")
//check for error messages
     .assert.containsText("#parsley-id-5", "The title field is required.")
     .assert.containsText("#parsley-id-9", "The alphacode field is required.")
     .assert.containsText("#parsley-id-11", "The numericcode field is required.")
     .assert.containsText("#parsley-id-13", "The alphanumericcode field is required.")
     .assert.containsText("#parsley-id-15", "The projecttypes field is required.")
     .end();
    }
};
