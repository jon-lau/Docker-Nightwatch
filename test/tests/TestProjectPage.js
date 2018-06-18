/// <reference path="../pages/project.js" />

/*
NAME:  TestProjectPage
DESCRIPTION:  These tests are intended to only test functionality of the
            Project Page. Testing the specific pages before and after testing
            of the Project Page functionality should be moved to their specific
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
    'Create New Project Then Delete': function (browser) {
        //login
        var projectPage = browser.page.login().navigate().signIn("user0@seed.net", "Password0");
        //click disciplines dropdown
        projectPage.page.project().selectProjectDropDown()
            .pause(2000);

        //create new project 
        projectPage.page.project().addProject(2000, "Test Name", "123 Address st", "Apt. A", "Honolulu", "12345", "This is a description...", 2, 25, 50, 100, "Lead Name", "lead@email.com", "Owner Name", "123 Owner st", "Owner apt. A", "Owner Honolulu", "12345", "1231231234", "3213214321")
            .pause(2000);

        //delete project
        projectPage.page.project().deleteProject();
        browser.end();
    }
};
