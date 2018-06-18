module.exports = { // adapted from: https://git.io/vodU0
    'Valid Firm Type Test': function (browser) {
        browser
        .url(browser.globals.host)
            .waitForElementVisible('body', 1000)
            .assert.title('Hawaii DOE | Consultant Portal')
    //sign in
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
    //create firm
     .waitForElementVisible("ul div:nth-child(3) div a", 1000) //firm types
     .click("ul div:nth-child(3) div a")
     .waitForElementVisible("div.right_col div div.page-with-table-button a", 1000) //create new
     .click("div.right_col div div.page-with-table-button a")
     .waitForElementVisible("form input[id='Name']", 1000)
     .click("form input[id='Name']")
     .waitForElementVisible("input[type=submit][value='Create']", 1000)
     .click("input[type=submit][value='Create']")
     .assert.containsText("#parsley-id-5", "The company type field is required.")
      .end();
    }
};
