/// <reference path="../pages/company.js" />

/*
NAME:  TestCompanyPage
DESCRIPTION:  These tests are intended to only test functionality of the
            Company Page. Testing the specific pages before and after testing
            of the Company Page functionality should be moved to their specific
            test file.
NOTES:  -The reference above is intended to provide JS intellisense.
*/

module.exports = { // adapted from: https://git.io/vodU0
    "Valid Edit Company Information Test": function (browser) {
        //login
        var companyPage = browser.page.company().navigate().signIn("user0@seed.net", "Password0");
        //click company dropdown
        companyPage.page.company().updateFirmName("");
        browser.waitForElementVisible("#generalInfoForm div:nth-child(1) div:nth-child(1) div input")
            .assert.containsText("#parsley-id-5 li", "This field is required.");
        browser.end();
    },
    "Test Register Company": function (browser) {
        //login
        var companyPage = browser.page.company().navigate().signIn("user2@seed.net", "Password2");
        //clean up account if company already created
        browser.waitForElementVisible('body')
            .url(function (res) {
                //if company already exists
                if (res.value.indexOf("Companies/Add") == -1) {
                    //delete company
                    browser.page.company().deleteCompany();
                }
            });
        //enter company ssn
        companyPage.page.company().registerCompany("808-13-1234", "Test Firm");

        companyPage.page.company().updateFirmName("Test Firm Name")
        browser.assert.valueContains("#generalInfoForm div:nth-child(1) div:nth-child(1) div input", "Test Firm Name");

        //click delete company
        companyPage.page.company().deleteCompany();
        browser.end();
    },
    "Test Submit Qualifications Using Save All": function (browser) {
        //Sign in to Consultant Account
        var companyPage = browser.page.company().navigate().signIn("user5@seed.net", "Password5");
        //clean up account if company already created
        browser.waitForElementVisible('body')
            .url(function (res) {
                //if company already exists
                if (res.value.indexOf("Companies/Add") == -1) {
                    //delete company
                    browser.page.company().deleteCompany();
                }
            });
        //Register Company 
        companyPage.page.company().registerCompany("808-11-1234", "Test Firm");

        //Navigate to company information
        companyPage.page.company().selectCompanyDropDown();

        browser
            //check to see if company name match with user input
            .waitForElementVisible("#generalInfoForm div:nth-child(1) div:nth-child(1) div input")
            .assert.valueContains("#generalInfoForm div:nth-child(1) div:nth-child(1) div input", "Test Firm")
        
        companyPage.page.company().verifyDocumentFields();
            browser
            //Complete company information
        companyPage.page.company().addCompanyInfo("123 Test Street", "Honolulu", "96822", "8089904723",
            "8081234723", "1990", "5", "10", "5", "/../AttachmentFiles/TestFile.pdf")
            browser
            //Add Project Information
            .waitForElementVisible("#CompanyProjectInfo > div > div > div.x_title > div > div.wrapper-icons > div > ul > li > button")
            .click("#CompanyProjectInfo > div > div > div.x_title > div > div.wrapper-icons > div > ul > li > button");

            companyPage.page.company().updateProjectInfo("Test Assignment", "Test Project Management", "Test Project Workflow", "Test Quality Control",
                "1", "2", "3", "4", "5", "6", "7", "8", false);

            //disciplines dropdown
            companyPage.page.discipline().selectDisciplineDropDown();

            //create new discipline 
            companyPage.page.discipline().addDiscipline(3, false);

            //complete branch section
            companyPage.page.branch().openBranchDropDown();

            // Expand main office
            browser.customClick("csp-branch .collapse-link");

            companyPage.page.branch().setArchitects(1);

            companyPage.page.branch().setMechanicalEngineers(2);

            companyPage.page.branch().setElectricalEngineers(3);

            companyPage.page.branch().setCivilEngineers(4);

            companyPage.page.branch().setOtherEngineers(5);

            companyPage.page.branch().setDraftsmen(1);

            companyPage.page.branch().setSpecificationWriters(2);

            companyPage.page.branch().setEstimators(3);

            companyPage.page.branch().setInspectors(4);

            companyPage.page.branch().setSurveyors(5);

            companyPage.page.branch().setEmployeeBalance(6);

            companyPage.page.branch().setDraftsmen(1);

            //complete employee section
            companyPage.page.employee().openEmployeeDashboard();

            //click add employee
            companyPage.page.employee().clickNewEmployeeLink();
        
            companyPage.page.employee().addEmployee(1, "Sample first", "Sample last", "1", "CEO", "10", "1", "5", "10", "1", "1", "1", "5", "Director",
                "Many and Varied", 1, 1, false);

            companyPage.page.employee().checkEmployeeLevelFields();

            companyPage.page.project().selectProjectDropDown();

            companyPage.page.project().addProject(2000, "Test Name", "123 Address st", "Apt. A", "Honolulu", "12345", "This is a description...", 2, 25, 50, 100,
            "Lead Name", "lead@email.com", "Owner Name", "123 Owner st", "Owner apt. A", "Owner Honolulu", "12345", "1231231234", "3213214321", false)

            //save all info
            companyPage.page.company().saveAll();

            //submit qualifications
            companyPage.page.company().submitQualifications();
        
        //Delete Created Company
        companyPage.page.company().deleteCompany();
        browser.end();
    },
    "Test Submit Qualifications": function (browser) {
        //Sign in to Consultant Account
        var companyPage = browser.page.company().navigate().signIn("user5@seed.net", "Password5");
        //clean up account if company already created
        browser.waitForElementVisible('body')
            .url(function (res) {
                //if company already exists
                if (res.value.indexOf("Companies/Add") == -1) {
                    //delete company
                    browser.page.company().deleteCompany();
                }
            });
        //Register Company 
        companyPage.page.company().registerCompany("808-11-1234", "Test Firm");

        companyPage.page.company().updateGeneralInfo("", 1, "2000", 1, "test", "", "test", 1, "11111", "(808) 123-4567", "", "", "5", "1", "1");

        //Complete company information
        companyPage.page.company().updateInsuranceInfo("/../AttachmentFiles/TestFile.pdf")

        companyPage.page.company().updateProjectInfo("Test Assignment", "Test Project Management", "Test Project Workflow", "Test Quality Control",
            "1", "2", "3", "4", "5", "6", "7", "8");

        //disciplines dropdown
        companyPage.page.discipline().selectDisciplineDropDown();

        //create new discipline 
        companyPage.page.discipline().addDiscipline(3);

        //complete branch section
        companyPage.page.branch().openBranchDropDown();

        // Expand main office
        browser.customClick("csp-branch .collapse-link");

        companyPage.page.branch().setArchitects(1);

        companyPage.page.branch().setMechanicalEngineers(2);

        companyPage.page.branch().setElectricalEngineers(3);

        companyPage.page.branch().setCivilEngineers(4);

        companyPage.page.branch().setOtherEngineers(5);

        companyPage.page.branch().setDraftsmen(1);

        companyPage.page.branch().setSpecificationWriters(2);

        companyPage.page.branch().setEstimators(3);

        companyPage.page.branch().setInspectors(4);

        companyPage.page.branch().setSurveyors(5);

        companyPage.page.branch().setEmployeeBalance(6);

        companyPage.page.branch().setDraftsmen(1);

        companyPage.page.branch().submitFormButton();

        //complete employee section
        companyPage.page.employee().openEmployeeDashboard();

        //click add employee
        companyPage.page.employee().clickNewEmployeeLink();

        companyPage.page.employee().checkEmployeeLevelFields();

        companyPage.page.employee().addEmployee(1, "Sample first", "Sample last", "1", "CEO", "10", "1", "5", "10", "1", "1", "1", "5", "Director",
            "Many and Varied", 1, 1);

        companyPage.page.project().selectProjectDropDown();

        companyPage.page.project().addProject(2000, "Test Name", "123 Address st", "Apt. A", "Honolulu", "12345", "This is a description...", 2, 25, 50, 100,
        "Lead Name", "lead@email.com", "Owner Name", "123 Owner st", "Owner apt. A", "Owner Honolulu", "12345", "1231231234", "3213214321")

        //submit qualifications
        companyPage.page.company().submitQualifications();

        //Delete Created Company
        companyPage.page.company().deleteCompany();
        browser.end();
    },
    'Test Submit Qualifications With Admin Check': function (browser) {
        //Sign in to Consultant Account
        var companyPage = browser.page.company().navigate().signIn("user5@seed.net", "Password5");
        //clean up account if company already created
        browser.waitForElementVisible('body')
            .url(function (res) {
                //if company already exists
                if (res.value.indexOf("Companies/Add") == -1) {
                    //delete company
                    browser.page.company().deleteCompany();
                }
            });
        //Register Company: Note name is set with a's to appear first in search results to ensure proper validation
        companyPage.page.company().registerCompany("808-11-1234", "aaa123");

        companyPage.page.company().updateGeneralInfo("", 1, "2000", 1, "test", "", "test", 1, "11111", "(808) 123-4567", "", "", "5", "1", "1");

        //Complete company information
        companyPage.page.company().updateInsuranceInfo("/../AttachmentFiles/TestFile.pdf")

        companyPage.page.company().updateProjectInfo("Test Assignment", "Test Project Management", "Test Project Workflow", "Test Quality Control",
            "1", "2", "3", "4", "5", "6", "7", "8");

        //disciplines dropdown
        companyPage.page.discipline().selectDisciplineDropDown();

        //create new discipline 
        companyPage.page.discipline().addDiscipline(3);

        //disciplines dropdown
        companyPage.page.discipline().selectDisciplineDropDown();

        //create new discipline 
        companyPage.page.discipline().addDiscipline(20);

        //disciplines dropdown
        companyPage.page.discipline().selectDisciplineDropDown();

        //create new discipline 
        companyPage.page.discipline().addDiscipline(28);

        //complete branch section
        companyPage.page.branch().openBranchDropDown();

        // Expand main office
        browser.customClick("csp-branch .collapse-link");

        companyPage.page.branch().setArchitects(1);

        companyPage.page.branch().setMechanicalEngineers(2);

        companyPage.page.branch().setElectricalEngineers(3);

        companyPage.page.branch().setCivilEngineers(4);

        companyPage.page.branch().setOtherEngineers(5);

        companyPage.page.branch().setDraftsmen(1);

        companyPage.page.branch().setSpecificationWriters(2);

        companyPage.page.branch().setEstimators(3);

        companyPage.page.branch().setInspectors(4);

        companyPage.page.branch().setSurveyors(5);

        companyPage.page.branch().setEmployeeBalance(6);

        companyPage.page.branch().setDraftsmen(1);

        companyPage.page.branch().submitFormButton();

        //complete employee section
        companyPage.page.employee().openEmployeeDashboard();

        //click add employee
        companyPage.page.employee().clickNewEmployeeLink();

        companyPage.page.employee().checkEmployeeLevelFields();

        companyPage.page.employee().addEmployee(1, "Sample first", "Sample last", "1", "CEO", "10", "1", "5", "10", "1", "1", "1", "5", "Director",
            "Many and Varied", 1, 1);

        companyPage.page.project().selectProjectDropDown();

        companyPage.page.project().addProject(2000, "Test Name", "123 Address st", "Apt. A", "Honolulu", "12345", "This is a description...", 2, 25, 50, 100,
        "Lead Name", "lead@email.com", "Owner Name", "123 Owner st", "Owner apt. A", "Owner Honolulu", "12345", "1231231234", "3213214321")

        //submit qualifications
        companyPage.page.company().submitQualifications();

        browser
            //view submitted qualifications
            .waitForElementVisible("#viewSubmittedQualifications")
            .customClick("#viewSubmittedQualifications")
            //Check For Expected Documents
            .waitForElementVisible("div.submittal-year-group div:nth-child(3) table tbody tr:nth-child(2) td:nth-child(1) a")
            .assert.containsText("div.submittal-year-group div:nth-child(3) table tbody tr:nth-child(2) td:nth-child(1) a", "aaa123-2018-Attachment A.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(3) table tbody tr:nth-child(3) td:nth-child(1) a", "aaa123-2018-DPW 120.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(3) table tbody tr:nth-child(4) td:nth-child(1) a", "aaa123-2018-Facilities IT Attachment.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(3) table tbody tr:nth-child(5) td:nth-child(1) a", "aaa123-2018-Various Service Attachment.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(2) td:nth-child(1) ul li a", "TestFile.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(2) td:nth-child(2)", "Landscape Architecture")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(3) td:nth-child(1) ul li a", "TestFile.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(3) td:nth-child(2)", "Facility Information Technology Technical Services - Geographic Info Systems (GIS)")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(4) td:nth-child(1) ul li a", "TestFile.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(4) td:nth-child(2)", "Archaeology")
            .assert.containsText("div.submittal-year-group div:nth-child(7) table tbody tr:nth-child(2) td:nth-child(1) a", "TestFile.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(7) table tbody tr:nth-child(2) td:nth-child(2)", "Transmittal Letter")

        companyPage.page.login().signOut();
        
        //click sign in as admin
        companyPage = browser.page.company().navigate().signIn("admin@revacomm.com", "password");

        browser
            //search by company name
            .waitForElementVisible("#searchString")
            .setValue("#searchString", "aaa123")
            .customClick("form input[type=submit][value='Search']")
            //click on company details
            .waitForElementVisible("body > div > div > div.right_col > div > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(2)")
            .assert.containsText("body > div > div > div.right_col > div > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(2)", "User5 Seed")
            .customClick("body > div > div > div.right_col > div > div.table-responsive > table > tbody > tr:nth-child(2) > td.td-padded-right-auto-lh > div > a")
            //verify correct information
            .assert.containsText("body > div > div > div.right_col > div:nth-child(1) > div.col-sm-12.col-md-4 > div > div:nth-child(2) > table > tbody > tr:nth-child(1) > td", "Individual")
            .assert.containsText("body > div > div > div.right_col > div:nth-child(1) > div.col-sm-12.col-md-4 > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td", "aaa123")
            .assert.containsText("body > div > div > div.right_col > div:nth-child(1) > div.col-sm-12.col-md-4 > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td", "test")
            .assert.containsText("body > div > div > div.right_col > div:nth-child(1) > div.col-sm-12.col-md-4 > div > div:nth-child(2) > table > tbody > tr:nth-child(5) > td", "Test")
            .assert.containsText("body > div > div > div.right_col > div:nth-child(1) > div.col-sm-12.col-md-4 > div > div:nth-child(2) > table > tbody > tr:nth-child(6) > td", "Hawaii")
            .assert.containsText("body > div > div > div.right_col > div:nth-child(1) > div.col-sm-12.col-md-4 > div > div:nth-child(2) > table > tbody > tr:nth-child(7) > td", "11111")
            .assert.containsText("body > div > div > div.right_col > div:nth-child(1) > div.col-sm-12.col-md-4 > div > div:nth-child(2) > table > tbody > tr:nth-child(8) > td", "(808) 123-4567")
            .assert.containsText("body > div > div > div.right_col > div:nth-child(1) > div.col-sm-12.col-md-4 > div > div:nth-child(2) > table > tbody > tr:nth-child(10) > td", "Hawaii")
            .assert.containsText("body > div > div > div.right_col > div:nth-child(1) > div.col-sm-12.col-md-4 > div > div:nth-child(2) > table > tbody > tr:nth-child(11) > td", "2000")
            .assert.containsText("body > div > div > div.right_col > div:nth-child(1) > div.col-sm-12.col-md-4 > div > div:nth-child(2) > table > tbody > tr:nth-child(12) > td", (new Date().getFullYear() - 2000))
            .assert.containsText("body > div > div > div.right_col > div:nth-child(1) > div.col-sm-12.col-md-4 > div > div:nth-child(2) > table > tbody > tr:nth-child(13) > td", "5")
            .assert.containsText("body > div > div > div.right_col > div:nth-child(1) > div.col-sm-12.col-md-4 > div > div:nth-child(2) > table > tbody > tr:nth-child(14) > td", "User5 Seed")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(1) > a", "aaa123-2018-Attachment A.pdf")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(3) > table > tbody > tr:nth-child(3) > td:nth-child(1) > a", "aaa123-2018-DPW 120.pdf")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(3) > table > tbody > tr:nth-child(4) > td:nth-child(1) > a", "aaa123-2018-Facilities IT Attachment.pdf")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(3) > table > tbody > tr:nth-child(5) > td:nth-child(1) > a", "aaa123-2018-Various Service Attachment.pdf")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(5) > table > tbody > tr:nth-child(2) > td:nth-child(1) > ul > li > a", "TestFile.pdf")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(5) > table > tbody > tr:nth-child(2) > td:nth-child(2)", "Landscape Architecture")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(5) > table > tbody > tr:nth-child(2) > td:nth-child(3)", "User5 Seed")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(1) > ul > li > a", "TestFile.pdf")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(2)", "Facility Information Technology Technical Services - Geographic Info Systems (GIS)")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(3)", "User5 Seed")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(5) > table > tbody > tr:nth-child(4) > td:nth-child(1) > ul > li > a", "TestFile.pdf")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(5) > table > tbody > tr:nth-child(4) > td:nth-child(2)", "Archaeology")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(5) > table > tbody > tr:nth-child(4) > td:nth-child(3)", "User5 Seed")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(7) > table > tbody > tr:nth-child(2) > td:nth-child(1) > a", "TestFile.pdf")
            .assert.containsText("#submissions-panel > div > div > div.submittal-year-group > div:nth-child(7) > table > tbody > tr:nth-child(2) > td:nth-child(2)", "Transmittal Letter")

        companyPage.page.login().signOut();

        companyPage = browser.page.company().navigate().signIn("user5@seed.net", "Password5");

        //Delete Created Company
        companyPage.page.company().deleteCompany();
        browser.end();
    },
};
