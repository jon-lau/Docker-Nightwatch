

module.exports = { // adapted from: https://git.io/vodU0
    'Create and Edit and Delete Discipline': function (browser) {
        browser
        .url(browser.globals.host)
            .waitForElementVisible('body', 1000)
            .assert.title('Hawaii DOE | Consultant Portal')
// log in
     .waitForElementVisible(".row.homepage-content", 1000)
     .customClick(".row.homepage-content")
     .waitForElementVisible("nav .col-xs-1 button", 1000) //sign in button
     .customClick("nav .col-xs-1 button")
     .waitForElementVisible("form input[name='Email']", 1000)
     .customClick("form input[name='Email']")
     .waitForElementVisible("input[name='Email']", 1000)
     .setValue("input[name='Email']", "admin@revacomm.com")
     .waitForElementVisible("input[name='Password']", 1000)
     .setValue("input[name='Password']", "password")
     .waitForElementVisible("form input[type=submit][value='Log in']", 1000)
     .customClick("form input[type=submit][value='Log in']")
// create discipline 
     .waitForElementVisible("div:nth-child(3) ul div:nth-child(1) div li a", 1000) //disciplines
     .customClick("div:nth-child(3) ul div:nth-child(1) div li a")
     .waitForElementVisible("div.right_col div div.page-with-table-button a", 1000) //create new
     .customClick("div.right_col div div.page-with-table-button a")
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
     .customClick("input[type=submit][value='Create']")

// edit discipline
     .waitForElementVisible("div.right_col div div.page-with-table-button a", 1000) //create new
     .customClick('tr:nth-child(2) td:last-child a:nth-child(1)') //'edit' button
     .waitForElementVisible("form input[name='Title']", 1000)
     .clearValue("input[name = 'Title']")
     .setValue("input[name='Title']", "Latest Disciplines")
     .waitForElementVisible("form input[name='AlphaCode']", 1000)
     .clearValue("input[name = 'AlphaCode']")
     .setValue("input[name='AlphaCode']", "BB")
     .waitForElementVisible("form input[name='NumericCode']", 1000)
     .clearValue("input[name = 'NumericCode']")
     .setValue("input[name='NumericCode']", "22")
     .waitForElementVisible("form input[name='AlphaNumericCode']", 1000)
     .clearValue("input[name = 'AlphaNumericCode']")
     .setValue("input[name='AlphaNumericCode']", "BB22")
     .waitForElementVisible("form input[name='ProjectTypes']", 1000)
     .clearValue("input[name = 'ProjectTypes']")
     .setValue("input[name='ProjectTypes']", "YYY")
     .waitForElementVisible("input[type=submit][value='Save']", 1000)
     .customClick("input[type=submit][value='Save']")

//delete discipline
     .waitForElementVisible('tr:nth-child(2) td:last-child a:last-child', 1000)
     .customClick('tr:nth-child(2) td:last-child a:last-child') //delete button
     .waitForElementVisible("form input[type=submit][value='Delete']", 1000)
     .customClick("form input[type=submit][value='Delete']")
     .waitForElementVisible("div.right_col div div.page-with-table-button a", 1000) //create new
     .end();
    }
};
