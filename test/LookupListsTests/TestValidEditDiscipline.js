

module.exports = { // adapted from: https://git.io/vodU0
    'Create and Edit and Delete Discipline': function (browser) {
        browser
        .url(browser.globals.host)
        .waitForElementVisible('body', 1000)
        .assert.title('Hawaii DOE | Consultant Portal')
// log in
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
// create discipline 
        .waitForElementVisible("div:nth-child(3) ul div:nth-child(1) div li a", 1000) //disciplines
        .click("div:nth-child(3) ul div:nth-child(1) div li a")
        .waitForElementVisible("body > div > div > div.right_col > div > div.page-with-table-button > a", 1000) //create new
        .click("body > div > div > div.right_col > div > div.page-with-table-button > a")
        .waitForElementVisible("form input[name='Title']", 1000)
        .setValue("input[name='Title']", "Sample Disciplines")
        .waitForElementVisible("form input[name='AlphaCode']", 1000)
        .setValue("input[name='AlphaCode']", "AA")
        .waitForElementVisible("form input[name='NumericCode']", 1000)
        .setValue("input[name='NumericCode']", "11")
        .waitForElementVisible("form input[name='AlphaNumericCode']", 1000)
        .setValue("input[name='AlphaNumericCode']", "AA11")
        .waitForElementVisible("form input[name='ProjectTypes']", 1000)
        .setValue("input[name='ProjectTypes']", "XXX")
        .waitForElementVisible("input[type=submit][value='Create']", 1000)
        .click("input[type=submit][value='Create']")
        .waitForElementVisible("body div div div.right_col div div.table-responsive table tbody tr:nth-child(2) td:nth-child(1)", 5000)
        .assert.containsText("body div div div.right_col div div.table-responsive table tbody tr:nth-child(2) td:nth-child(1)", "Sample Disciplines")
        .waitForElementVisible("body div div div.right_col div div.table-responsive table tbody tr:nth-child(2) td:nth-child(2)", 5000)
        .assert.containsText("body div div div.right_col div div.table-responsive table tbody tr:nth-child(2) td:nth-child(2)", "AA")
        .waitForElementVisible("body div div div.right_col div div.table-responsive table tbody tr:nth-child(2) td:nth-child(3)", 5000)
        .assert.containsText("body div div div.right_col div div.table-responsive table tbody tr:nth-child(2) td:nth-child(3)", "11")
        .waitForElementVisible("body div div div.right_col div div.table-responsive table tbody tr:nth-child(2) td:nth-child(4)", 5000)
        .assert.containsText("body div div div.right_col div div.table-responsive table tbody tr:nth-child(2) td:nth-child(4)", "AA11")
        .waitForElementVisible("body div div div.right_col div div.table-responsive table tbody tr:nth-child(2) td:nth-child(6)", 5000)
        .assert.containsText("body div div div.right_col div div.table-responsive table tbody tr:nth-child(2) td:nth-child(6)", "XXX")

// edit discipline
        .waitForElementVisible('tr:nth-child(2) td:last-child a:nth-child(1)', 1000) //create new
        .click('tr:nth-child(2) td:last-child a:nth-child(1)') //'edit' button
        .waitForElementVisible("form input[name='Title']", 1000)
        .clearValue("input[name = 'Title']")
        .waitForElementVisible("form input[name='AlphaCode']", 1000)
        .clearValue("input[name = 'AlphaCode']")
        .waitForElementVisible("form input[name='NumericCode']", 1000)
        .clearValue("input[name = 'NumericCode']")
        .waitForElementVisible("form input[name='AlphaNumericCode']", 1000)
        .clearValue("input[name = 'AlphaNumericCode']")
        .waitForElementVisible("form input[name='ProjectTypes']", 1000)
        .clearValue("input[name = 'ProjectTypes']")
        .waitForElementVisible("input[type=submit][value='Save']", 1000) //save
        .click("input[type=submit][value='Save']")
        .assert.containsText("#parsley-id-5", "The title field is required.")
        .assert.containsText("#parsley-id-9", "The alphacode field is required.")
        .assert.containsText("#parsley-id-11", "The numericcode field is required.")
        .assert.containsText("#parsley-id-13", "The alphanumericcode field is required.")
        .assert.containsText("#parsley-id-15", "The projecttypes field is required.")

        //click return screen
        .waitForElementVisible("body  div  div  div.right_col  div  a", 5000)
        .click("body  div  div  div.right_col  div  a")
//delete discipline
        .waitForElementVisible('tr:nth-child(2) td:last-child a:last-child', 1000)
        .click('tr:nth-child(2) td:last-child a:last-child') //delete button
        .waitForElementVisible("form input[type=submit][value='Delete']", 1000)
        .click("form input[type=submit][value='Delete']")
        .end();
    }
};
