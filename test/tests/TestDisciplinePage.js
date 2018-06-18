/// <reference path="../pages/discipline.js" />

/*
NAME:  TestDisciplinePage
DESCRIPTION:  These tests are intended to only test functionality of the
            Discipline Page. Testing the specific pages before and after testing
            of the Discipline Page functionality should be moved to their specific
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
    'New discipline from Central Dashboard': function (browser) {
        //login
        var disciplinePage = browser.page.login().navigate().signIn("user0@seed.net", "Password0");
            //click dicsiplines dropdown
        disciplinePage.page.discipline().selectDisciplineDropDown().pause(2000);

        //create new discipline 
        disciplinePage.page.discipline().addDiscipline(3).pause(2000);

        //delete discipline
        disciplinePage.page.discipline().deleteDiscipline();
        browser.end();
    },
    'Discipline Icon Test': function (browser) {
        //login
        var disciplinePage = browser.page.login().navigate().signIn("user9@seed.net", "Password9");

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
        disciplinePage.page.company().registerCompany("111-12-1234", "Test Firm");

        //disciplines dropdown
        disciplinePage.page.discipline().selectDisciplineDropDown();

        //create new discipline 
        disciplinePage.page.discipline().addDiscipline(3);

        //verify complete status
        browser.waitForElementVisible("#submission-status completion-status div p")
            .waitForElementVisible('#submission-status completion-status div img')
            .assert.containsText("#submission-status completion-status div p", "Complete")
            .assert.elementPresent("#submission-status completion-status div img")

        //delete company
        browser.page.company().deleteCompany();
        browser.end();
    },
};
