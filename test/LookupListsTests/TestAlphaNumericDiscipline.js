
module.exports = { // adapted from: https://git.io/vodU0
    'Alpha Numeric Discipline Test': function (browser) {
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
     .waitForElementVisible("form input[name='AlphaCode']", 1000)
     .setValue("input[name='AlphaCode']", "123")
     .waitForElementVisible("form input[name='NumericCode']", 1000)
     .setValue("input[name='NumericCode']", "abc")

//check that nothing was added
     .assert.containsText("#AlphaCode", "")
     .assert.containsText("#NumericCode", "")
     .end();
    }
};
