/// <reference path="../pages/employee.js" />

/*
NAME:  TestEmployeePage
DESCRIPTION:  These tests are intended to only test functionality of the
            Employee Page. Testing the specific pages before and after testing
            of the Employee Page functionality should be moved to their specific
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
    'New Technical Employee from Central Dashboard Test': function (browser) {
        //login
        var employeePage = browser.page.employee().navigate().signIn("user7@seed.net", "Password7");

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
        employeePage.page.employee().registerCompany("808-12-1234", "Test Firm");

        //click employees dropdown
        employeePage.page.employee().openEmployeeDashboard();
            //click add employee
        employeePage.page.employee().clickNewEmployeeLink();
            //Input Required Fields 
        employeePage.page.employee().addEmployee(1, "Sample first", "Sample last", "1", "CEO", "10", "1", "5", "10", "1", "1", "1", "5", "Director", "Many and Varied", 1, 1);
        //click delete personnel
        employeePage.page.employee().deleteEmployee();
        browser.end();
    },
    'New Employee from Central Dashboard': function (browser) {
        //login
        var employeePage = browser.page.employee().navigate().signIn("user7@seed.net", "Password7");

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
        employeePage.page.employee().registerCompany("808-12-1234", "Test Firm");

        //click employees dropdown
        employeePage.page.employee().openEmployeeDashboard();
            //click add employee
        employeePage.page.employee().clickNewEmployeeLink();
        //Input Required Fields 
        employeePage.page.employee().addEmployee("1", "Sample first", "Sample last", "1", "CEO", "10", "1", "5", "10", "1", "1", "1", "5", "Director", "Many and Varied", 1, 1);
        
        //click delete personnel
        employeePage.page.employee().deleteEmployee();
        browser.end();
    },
    'Employee Icon Test': function (browser) {
        //login
        var employeePage = browser.page.employee().navigate().signIn("user7@seed.net", "Password7");
        
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
        employeePage.page.employee().registerCompany("808-12-1234", "Test Firm");

        //click employees dropdown
        employeePage.page.employee().openEmployeeDashboard();

        //click add employee
        employeePage.page.employee().clickNewEmployeeLink();

        //add employee
        employeePage.page.employee().addEmployee(1, "Sample first", "Sample Last", "1", "CEO", "10", "1", "5", "10", "1", "1", "1", "5", "Director", "", 1, 1);

        //edit employee
        browser.waitForElementVisible("csp-employee form label[for*='FirstName'] + input")
            .setValue("csp-employee form label[for*='FirstName'] + input", "changed")
            .pause(5000)
            .waitForElementVisible("csp-employee form label[for*='LastName'] + input")
            .setValue("csp-employee form label[for*='LastName'] + input", "changed")
            //verify unsaved changes icon
            .waitForElementVisible("csp-employee div div div.x_title div div.col-md-3.col-xs-2.accordion-status completion-status div img.svg-minus-circle")
            .waitForElementVisible("csp-employee div div div.x_title div div.col-md-3.col-xs-2.accordion-status completion-status div p")
            .assert.containsText("csp-employee div div div.x_title div div.col-md-3.col-xs-2.accordion-status completion-status div p", "Unsaved Changes")
            .assert.elementPresent("csp-employee div div div.x_title div div.col-md-3.col-xs-2.accordion-status completion-status div img.svg-minus-circle")

        employeePage.page.company().saveAll();

        //click employees dropdown
        employeePage.page.employee().openEmployeeDashboard();

        //verify incomplete status
        browser.waitForElementVisible('#EmployeeRow div.x_title div.col-md-3.col-xs-6.accordion-status img')
            .waitForElementPresent("csp-employee div div div.x_title div div.col-md-3.col-xs-2.accordion-status completion-status div .svg-times-circle")
            .waitForElementPresent('#EmployeeRow div.x_title div.col-md-3.col-xs-6.accordion-status img')
            .waitForElementPresent("#personnel-panel img.svg-times-circle");

        //delete personnel
        employeePage.page.employee().deleteEmployee();

        //add employee
        employeePage.page.employee().clickNewEmployeeLink();
        employeePage.page.employee().addEmployee(1, "Sample first", "Sample last", "1", "CEO", "10", "1", "5", "10", "1", "1", "1", "5", "Director", "Many and Varied", 1, 1);
        employeePage.page.employee().saveEmployee();

        //verify complete status
        browser
            .waitForElementVisible('#EmployeeRow div.x_title div.col-md-3.col-xs-6.accordion-status img')
            .waitForElementPresent("csp-employee div div div.x_title div div.col-md-3.col-xs-2.accordion-status completion-status div .svg-check-circle")
            .waitForElementPresent('#EmployeeRow div.x_title div.col-md-3.col-xs-6.accordion-status img')
            .waitForElementPresent("#personnel-panel img.svg-check-circle");

        //delete personnel
        employeePage.page.employee().deleteEmployee();

        //verify incomplete status
        browser.waitForElementVisible('#EmployeeRow div.x_title div.col-md-3.col-xs-6.accordion-status img.svg-times-circle')

        //delete company
        browser.page.company().deleteCompany();
        browser.end();
    },
};
