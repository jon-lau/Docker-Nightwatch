/// <reference path="../pages/fileType.js" />

/*
NAME:  TestFileTypesPage
DESCRIPTION:  These tests are intended to only test functionality of the
              FileTypes Page. Testing the specific pages before and after
              the FileTypes Page functionality should be moved to their
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
*/
module.exports = { // adapted from: https://git.io/vodU0
    'Create File Type': function (browser) {
        //login
        var fileTypePage = browser.page.fileType().navigate().signIn();//Admin
        //create filetype
        fileTypePage.page.fileType().clickFileTypeLink();
        fileTypePage.page.fileType().createNewFileType("aaaaa");

        browser.waitForElementVisible("div.right_col div div.page-with-table-button a") //create new link
            .assert.containsText("body div div div.right_col div div.table-responsive table tbody tr:nth-child(1) td.td-padded-left", "aaaaa");
        fileTypePage.page.fileType().deletefirstFileType();
        //assert
        browser.waitForElementVisible("div.right_col div div.page-with-table-button a"); //create new link
        browser.expect.element('body div div div.right_col div div.table-responsive table tbody tr:nth-child(1) td.td-padded-left').text.to.not.equal('aaaaa');
        browser.end();
    },
    'Valid File Type Test': function (browser) {
        //login
        var fileTypePage = browser.page.fileType().navigate().signIn();//Admin
        //create file
        fileTypePage.page.fileType().clickFileTypeLink();
        fileTypePage.page.fileType().createNewFileType("");
        browser.assert.containsText("#parsley-id-5", "The file type field is required.")
            .end();
    },
    'Valid Edit File Type Test': function (browser) {
        //login
        var fileTypePage = browser.page.fileType().navigate().signIn();//Admin
        //create file
        fileTypePage.page.fileType().clickFileTypeLink();
        fileTypePage.page.fileType().createNewFileType("aaaaa");
        browser.waitForElementVisible("div.right_col div div.page-with-table-button a") //create new link
            .assert.containsText("body div div div.right_col div div.table-responsive table tbody tr:nth-child(1) td.td-padded-left", "aaaaa");
        //edit file
        fileTypePage.page.fileType().editFileType('');
        browser.assert.containsText("#parsley-id-5", "The file type field is required.") 
            //delete file
            .waitForElementVisible("div.right_col div a") //back to list
            .customClick("div.right_col div a")
            .waitForElementVisible("div.right_col div div.page-with-table-button a") //create new link
            .assert.containsText("body div div div.right_col div div.table-responsive table tbody tr:nth-child(1) td.td-padded-left", "aaaaa");
        fileTypePage.page.fileType().deletefirstFileType();
        browser.waitForElementVisible("div.right_col div div.page-with-table-button a") //create new link
            .end();
    },
    'Create Edit and Delete File Type': function (browser) {
        //login
        var fileTypePage = browser.page.fileType().navigate().signIn();//Admin
        //create file
        fileTypePage.page.fileType().clickFileTypeLink();
        fileTypePage.page.fileType().createNewFileType("aaaaa");
        browser.waitForElementVisible("div.right_col div div.page-with-table-button a") //create new link
            .assert.containsText("body div div div.right_col div div.table-responsive table tbody tr:nth-child(1) td.td-padded-left", "aaaaa");
        //edit file
        fileTypePage.page.fileType().editFileType('aaaab');
        browser.waitForElementVisible("div.right_col div div.page-with-table-button a") //create new link
            .assert.containsText("body div div div.right_col div div.table-responsive table tbody tr:nth-child(1) td.td-padded-left", "aaaab")
        //delete
        fileTypePage.page.fileType().deletefirstFileType()
        browser.waitForElementVisible("div.right_col div div.page-with-table-button a") //create new link
            .end();
    },
};

