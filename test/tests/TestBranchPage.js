/// <reference path="../pages/branch.js" />

/*
NAME:  TestBranchPage
DESCRIPTION:  These tests are intended to only test functionality of the
            Branch Page. Testing the specific pages before and after testing
            of the Branch Page functionality should be moved to their specific
            test file.
NOTES:  -Be aware of the order that you add any additional tests.  The last
        test in this file should be the only test that calls '.end()'.  If
        you intend to append a test to the end of this list please remove
        the '.end()' method from the previous test and add it to your test.
        The function of the '.end()' method not only closes the browser, but it
        also closes the Selenium Web Driver meaning no further tests will run.
        -The reference above is intended to provide JS intellisense.
*/

module.exports = { // adapted from: https://git.io/vodU0
    'Branch and Company Icon Test': function (browser) {
        //login
        var branchPage = browser.page.login().navigate().signIn();
        
        //clean up account if company already created
        browser.waitForElementVisible('body')
            .url(function (res) {
                //if company already exists
                if (res.value.indexOf("Companies/Add") == -1) {
                    //delete company
                    browser.page.company().deleteCompany();
                }
            });
        //register company
        branchPage.page.login().registerCompany("000-12-1234", "Test Firm");

            //verify incomplete status
        browser.waitForElementVisible("#CompanyRow div div div.x_title div div.col-md-3.col-xs-6.accordion-status completion-status div img")
            .waitForElementVisible("#CompanyRow div div div.x_title div div.col-md-3.col-xs-6.accordion-status completion-status div p")
            .assert.containsText("#CompanyRow div div div.x_title div div.col-md-3.col-xs-6.accordion-status completion-status div p", "Incomplete")
            .assert.elementPresent("#CompanyRow div div div.x_title div div.col-md-3.col-xs-6.accordion-status completion-status div img")

            //company info dropdown
        browser.page.company().updateGeneralInfo("", 1, "2000", 1, "test", "", "test", 1, "11111", "(808) 123-4567", "", "", "5", "1", "1");

        //branch dropdown
        branchPage.page.branch().openBranchDropDown();

        //verify incomplete status
        branchPage.waitForElementVisible("#BranchesRow div div div.x_title div div.col-md-3.col-xs-6.accordion-status completion-status div img")
            .waitForElementVisible("#BranchesRow div div div.x_title div div.col-md-3.col-xs-6.accordion-status completion-status div p")
            .assert.containsText("#BranchesRow div div div.x_title div div.col-md-3.col-xs-6.accordion-status completion-status div p", "Incomplete")
            .assert.elementPresent("#BranchesRow div div div.x_title div div.col-md-3.col-xs-6.accordion-status completion-status div img")

        //add branch
        branchPage.page.branch().addBranch();
        //verify unsaved changes status
        branchPage.waitForElementVisible("div.branches.row div.side-menu-title-status img.svg-minus-circle")
            .waitForElementVisible("#BranchesRow div div div.x_title div div.col-md-3.col-xs-6.accordion-status completion-status div p")
            .assert.containsText("#BranchesRow div div div.x_title div div.col-md-3.col-xs-6.accordion-status completion-status div p", "Unsaved Changes")
            .assert.elementPresent("div.branches.row div.side-menu-title-status img.svg-minus-circle");
        //fill out all branch fields
        branchPage.page.branch().setBranchFields("sample branch", "1234 Sample Street", "Honolulu", "96822", "8081234567", "8081234567", "1", "2", "2", "4", "4", "1", "1", "1", "0", "0", "1");
        //save

        browser.page.branch().submitFormButton();

        //delete branch
        branchPage.page.branch().deleteBranch();
        browser.pause(5000);

        //Delete Company
        branchPage.page.branch().deleteCompany();

        browser.end();
    },
    'New Branch from Central Dashboard': function (browser) {
        //login
        var branchPage = browser.page.login().navigate().signIn("user0@seed.net", "Password0");
        //click branches dropdown
        branchPage.page.branch().openBranchDropDown();
        //click add branch
        branchPage.page.branch().addBranch();

        //Input Required Fields 
        branchPage.page.branch().setBranchName(['Main Office', browser.Keys.ENTER]);
        branchPage.waitForElementVisible("#parsley-id-5")
            .assert.containsText("#parsley-id-5", "Branch with this name already exists.");

        branchPage.page.branch().setBranchFields("sample branch", "1234 Sample Street", "Honolulu", "96822", "8081234567", "8081234567", "1", "2", "2", "4", "4", "1", "1", "1", "0", "0", "0");
        
        branchPage.page.branch().submitFormButton()

        //delete branch
        branchPage.page.branch().deleteBranch();
            
        browser.end();
    },
};
