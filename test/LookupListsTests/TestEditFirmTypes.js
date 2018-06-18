module.exports = { // adapted from: https://git.io/vodU0
    'Create Edit and Delete Firm Type': function (browser) {
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
     .setValue("input[name='Name']", "test")
     .waitForElementVisible("input[type=submit][value='Create']", 1000)
     .click("input[type=submit][value='Create']")
     .waitForElementVisible("div.right_col div div.page-with-table-button a", 1000) //create new
    //assert
     .assert.containsText("body div div div.right_col div div.table-responsive table tbody tr:nth-child(2) td.td-padded-left", "test")
    //edit firm
     .click('tr:nth-child(2) td:last-child a:nth-child(1)') //edit button
     .waitForElementVisible("div.right_col div a", 1000) //back to list
     .waitForElementVisible("form input[id='Name']", 1000)
     .clearValue("input[name = 'Name']")
     .setValue("input[name='Name']", "test2")
     .waitForElementVisible("input[type=submit][value='Save']", 1000)
     .click("input[type=submit][value='Save']")
     .waitForElementVisible("div.right_col div div.page-with-table-button a", 1000) //create new
    //assert
     .assert.containsText("body div div div.right_col div div.table-responsive table tbody tr:nth-child(2) td.td-padded-left", "test2")
    //delete
     .click('tr:nth-child(2) td:last-child a:last-child') //delete button
     .waitForElementVisible("div.right_col div a", 1000) //back to list
     .waitForElementVisible("form input[type=submit][value='Delete']", 1000)
     .click("form input[type=submit][value='Delete']")
     .waitForElementVisible("div.right_col div div.page-with-table-button a", 1000) //create new
      .end();
    }
};
