
module.exports = { // adapted from: https://git.io/vodU0


    'Test Submit Qualifications, with 100 employees': function (browser) {
        //number of each employee type to create 
        EMPLOYEES = 2;
        //number of attributes per employee
        ATTRIBUTE = 5;

        //login
        var companyPage = browser.page.login().navigate().signIn("user5@seed.net", "Password5");
        //clean up account if company already created
        browser.waitForElementVisible('body')
            .waitForElementVisible('#CompanyRow')
            .element('css selector', '#CompanyRow', function (res) {
                //if company already exists
                if (res.status !== -1) {
                    //Delete Company
                    companyPage.page.company().deleteCompany();
                }
            });

        //Register Company 
        companyPage.page.company().registerCompany("118-11-1234", 'AZ Firm');
        //Update General Info
        companyPage.page.company().updateGeneralInfo("", 1, "1990", 1, "123 Test Street", "123 Test Street 2", "Honolulu", 1, "96822", "8081234567", "8081237654", "", 5, 1, 1)

      //Assert Company Information has been saved

        //assert correct company documents are shown
        //Other: Documents are shown
        //Transmittal Letter check
        companyPage.page.company().checkTrasmittal();

        //Certificate of good standing check
        companyPage.page.company().checkGoodStanding();

        //change company type
        browser.waitForElementVisible("#generalInfoForm div:nth-child(1) div:nth-child(3) div select option:nth-child(1)", 10000)
            .click("#generalInfoForm div:nth-child(1) div:nth-child(3) div select option:nth-child(" + 2 + ")").pause(5000);
        //Transmittal Letter Check
        companyPage.page.company().checkTrasmittal();
        //Certificate of good standing check

        ////Corporation: Documents are shown
        //change company type
        browser.waitForElementVisible("#generalInfoForm div:nth-child(1) div:nth-child(3) div select option:nth-child(1)", 10000)
            .click("#generalInfoForm div:nth-child(1) div:nth-child(3) div select option:nth-child(" + 3 + ")").pause(5000);
        //transmittal letter check
        companyPage.page.company().checkTrasmittal();
        //No certificate of good standing check
        ////Joint Venture: Documents are shown
        //change company type
        browser.waitForElementVisible("#generalInfoForm div:nth-child(1) div:nth-child(3) div select option:nth-child(1)", 10000)
            .click("#generalInfoForm div:nth-child(1) div:nth-child(3) div select option:nth-child(" + 4 + ")").pause(5000);
        //transmittal letter check
        companyPage.page.company().checkTrasmittal();
        //no certificate of good standing check
        ////Individual: Documents are shown
        //change company type
        browser.waitForElementVisible("#generalInfoForm div:nth-child(1) div:nth-child(3) div select option:nth-child(1)", 10000)
            .click("#generalInfoForm div:nth-child(1) div:nth-child(3) div select option:nth-child(" + 1 + ")").pause(5000);
        companyPage.page.company().checkTrasmittal();
        ////////////////Insurance Information/////////
        //Company Bonded
        browser.waitForElementVisible("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div:nth-child(1) div:nth-child(1) div div label input", 10000)
            .click("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div:nth-child(1) div:nth-child(1) div div label input").pause(1000);

        //Summarize Litigation history
        browser.waitForElementVisible("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div:nth-child(2) div div textarea")
            .setValue("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div:nth-child(2) div div textarea", "Test Litigaiton History...");

        //Transmittal Letter Set
        browser.setValue("#transmittalLetter", require('path').resolve(__dirname + '/../AttachmentFiles/TestFile.pdf'));
        browser.setValue('#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal div div div.row.row-margin-bottom.upload-file-row.required-info.company-file div.col-xs-10 label', require('path').resolve(__dirname + '/../AttachmentFiles/TestFile.pdf'));

        //Save form
        browser.pause(2000)
            .waitForElementVisible("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form button.btn.btn-default.btn-blue:nth-child(5)")
            .customClick("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form button.btn.btn-default.btn-blue:nth-child(5)")
            //confirm save
            .pause(2000)
            .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
            .click("#MessageModal div div div.modal-body div.pmd-modal-action button")
            .assert.valueContains("#generalInfoForm div:nth-child(7) div:nth-child(1) div input", "1")
            .pause(2000)
        
        

        //Project Info
        companyPage.page.company().addProjectInfo('Test Assignment', 'Test Project Management', 'Test Project Workflow', 'Test Quality Control');

            //Save form
        browser.pause(2000)
            .waitForElementVisible('#projectInfoForm div div button.btn.btn-default.btn-blue')
            .customClick('#projectInfoForm div div button.btn.btn-default.btn-blue')
            //confirm save
            .pause(2000)
            .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
            .click("#MessageModal div div div.modal-body div.pmd-modal-action button")
            .assert.valueContains("#generalInfoForm div:nth-child(7) div:nth-child(1) div input", "1");

        



            //////////////Disciplines//////////////
        
        //create discipline #1
        //var disciplinePage = browser.page.discipline().navigate();
        browser.page.discipline().selectDisciplineDropDown();

        browser.page.discipline().addDiscipline(1);
        browser.page.discipline().selectDisciplineDropDown();
        browser.page.discipline().addDiscipline(1);
        browser.page.discipline().selectDisciplineDropDown();
        browser.page.discipline().addDiscipline(1);
        browser.page.discipline().selectDisciplineDropDown();
        browser.page.discipline().addDiscipline(1);

        //complete branch section
        browser.page.branch().openBranchDropDown();
        
        //click main branch
        browser.pause(2000)
            .waitForElementVisible("#sidebar-menu div:nth-child(1) ul div.branches.row div li ul li:nth-child(2) a", 10000)
            .customClick("#sidebar-menu div:nth-child(1) ul div.branches.row div li ul li:nth-child(2) a")

            //assert main branch has same fields as company info
            .pause(2000)
            .waitForElementVisible(".row.branch-row.row-item.nested-accordion div:nth-child(1) > div:nth-child(1) > div > span.uneditable-field-input", 10000)
            .assert.containsText(".row.branch-row.row-item.nested-accordion div:nth-child(1) > div:nth-child(1) > div > span.uneditable-field-input", "Main Office")
            .waitForElementVisible(".row.branch-row.row-item.nested-accordion div:nth-child(1) > div:nth-child(2) > div > span.uneditable-field-input", 10000)
            .assert.containsText(".row.branch-row.row-item.nested-accordion div:nth-child(1) > div:nth-child(2) > div > span.uneditable-field-input", "123 Test Street")
            .waitForElementVisible(".row.branch-row.row-item.nested-accordion div:nth-child(1) > div:nth-child(4) > div > span.uneditable-field-input", 10000)
            .assert.containsText(".row.branch-row.row-item.nested-accordion div:nth-child(1) > div:nth-child(4) > div > span.uneditable-field-input", "Honolulu")

            .waitForElementVisible(".row.branch-row.row-item.nested-accordion div:nth-child(2) > div:nth-child(1) > div > span.uneditable-field-input", 30000)
            .assert.containsText(".row.branch-row.row-item.nested-accordion div:nth-child(2) > div:nth-child(1) > div > span.uneditable-field-input", "Hawaii")
            .waitForElementVisible(".row.branch-row.row-item.nested-accordion div:nth-child(2) > div:nth-child(2) > div > span.uneditable-field-input", 10000)
            .assert.containsText(".row.branch-row.row-item.nested-accordion div:nth-child(2) > div:nth-child(2) > div > span.uneditable-field-input", "96822")
            .waitForElementVisible(".row.branch-row.row-item.nested-accordion div:nth-child(2) > div:nth-child(3) > div > span.uneditable-field-input", 10000)
            .assert.containsText(".row.branch-row.row-item.nested-accordion div:nth-child(2) > div:nth-child(3) > div > span.uneditable-field-input", "(808) 123-4567")
            .waitForElementVisible(".row.branch-row.row-item.nested-accordion div:nth-child(2) > div:nth-child(4) > div > span.uneditable-field-input", 10000)
            .assert.containsText(".row.branch-row.row-item.nested-accordion div:nth-child(2) > div:nth-child(4) > div > span.uneditable-field-input", "(808) 123-7654");
            //input branches fields

        //enter architects field
        browser.page.branch().setArchitects("1");
        //enter mechanical engineers field
        browser.page.branch().setMechanicalEngineers("2");
        //enter electrical engineers field
        browser.page.branch().setElectricalEngineers("2");
        //enter civil engineers field
        browser.page.branch().setCivilEngineers("4");
        //enter other engineers field
        browser.page.branch().setOtherEngineers("4");
        //enter draftsmen field
        browser.page.branch().setDraftsmen("1");
        //enter SpecificationWriters field
        browser.page.branch().setSpecificationWriters("1");
        //enter Estimators field
        browser.page.branch().setEstimators("1");
        //enter Inspectors field
        browser.page.branch().setInspectors("0");
        //enter Surveyors field
        browser.page.branch().setSurveyors("0");
        //enter EmployeeBalance field
        browser.page.branch().setEmployeeBalance("0");
        //submit form
        browser.page.branch().submitFormButton();

            //////////////////////////////create discipline #2
            ////////////////////////////.waitForElementVisible("#sidebar-menu div.disciplines.row a.side-menu-create", 10000)
            ////////////////////////////.customClick("#sidebar-menu div.disciplines.row a.side-menu-create")
            //////////////////////////////create discipline
            //////////////////////////////select discipline
            ////////////////////////////.waitForElementVisible('div div.row.row-margin-bottom div div select option:nth-child(3)', 10000)
            ////////////////////////////.click('div div.row.row-margin-bottom div div select option:nth-child(3)')
            //////////////////////////////input file
            ////////////////////////////.waitForElementVisible("div.discipline-record.add-row button.btn.btn-default.btn-blue.select-pdf", 10000)
            ////////////////////////////.setValue('div.discipline-record.add-row input#RequiredFile', require('path').resolve(__dirname + '/../AttachmentFiles/DPW 120.pdf'))
            //////////////////////////////save
            ////////////////////////////.waitForElementVisible("div.discipline-record.add-row input.btn.btn-default.btn-blue.submit-discipline", 10000)
            ////////////////////////////.customClick("div.discipline-record.add-row input.btn.btn-default.btn-blue.submit-discipline")
            //////////////////////////////confirm submit
            ////////////////////////////.waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
            ////////////////////////////.customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")
            //////////////////////////////assert file upload
            ////////////////////////////.assert.containsText("div.discipline-record:last-child label.required-filename", "DPW 120.pdf")

            //////////////////////////////create discipline #3
            ////////////////////////////.waitForElementVisible("#sidebar-menu div.disciplines.row a.side-menu-create", 10000)
            ////////////////////////////.customClick("#sidebar-menu div.disciplines.row a.side-menu-create")
            //////////////////////////////create discipline
            //////////////////////////////select discipline
            ////////////////////////////.waitForElementVisible('div div.row.row-margin-bottom div div select option:nth-child(3)', 10000)
            ////////////////////////////.click('div div.row.row-margin-bottom div div select option:nth-child(3)')
            //////////////////////////////input file
            ////////////////////////////.waitForElementVisible("div.discipline-record.add-row button.btn.btn-default.btn-blue.select-pdf", 10000)
            ////////////////////////////.setValue('div.discipline-record.add-row input#RequiredFile', require('path').resolve(__dirname + '/../AttachmentFiles/DPW 120.pdf'))
            //////////////////////////////save
            ////////////////////////////.waitForElementVisible("div.discipline-record.add-row input.btn.btn-default.btn-blue.submit-discipline", 10000)
            ////////////////////////////.customClick("div.discipline-record.add-row input.btn.btn-default.btn-blue.submit-discipline")
            //////////////////////////////confirm submit
            ////////////////////////////.waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
            ////////////////////////////.customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")
            //////////////////////////////assert file upload
            ////////////////////////////.assert.containsText("div.discipline-record:last-child label.required-filename", "DPW 120.pdf")

            //////////////////////////////create discipline #4
            ////////////////////////////.waitForElementVisible("#sidebar-menu div.disciplines.row a.side-menu-create", 10000)
            ////////////////////////////.customClick("#sidebar-menu div.disciplines.row a.side-menu-create")
            //////////////////////////////create discipline
            //////////////////////////////select discipline
            ////////////////////////////.waitForElementVisible('div div.row.row-margin-bottom div div select option:nth-child(3)', 10000)
            ////////////////////////////.click('div div.row.row-margin-bottom div div select option:nth-child(3)')
            //////////////////////////////input file
            ////////////////////////////.waitForElementVisible("div.discipline-record.add-row button.btn.btn-default.btn-blue.select-pdf", 10000)
            ////////////////////////////.setValue('div.discipline-record.add-row input#RequiredFile', require('path').resolve(__dirname + '/../AttachmentFiles/Various Service Attachment.pdf'))
            //////////////////////////////save
            ////////////////////////////.waitForElementVisible("div.discipline-record.add-row input.btn.btn-default.btn-blue.submit-discipline", 10000)
            ////////////////////////////.customClick("div.discipline-record.add-row input.btn.btn-default.btn-blue.submit-discipline")
            //////////////////////////////confirm submit
            ////////////////////////////.waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
            ////////////////////////////.customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")
            //////////////////////////////assert file upload
            ////////////////////////////.assert.containsText("div.discipline-record:last-child label.required-filename", "Various Service Attachment.pdf")

            //////////////////////////////create discipline #5
            ////////////////////////////.waitForElementVisible("#sidebar-menu div.disciplines.row a.side-menu-create", 10000)
            ////////////////////////////.customClick("#sidebar-menu div.disciplines.row a.side-menu-create")
            //////////////////////////////create discipline
            //////////////////////////////select discipline
            ////////////////////////////.waitForElementVisible('div div.row.row-margin-bottom div div select option:nth-child(3)', 10000)
            ////////////////////////////.click('div div.row.row-margin-bottom div div select option:nth-child(3)')
            //////////////////////////////input file
            ////////////////////////////.waitForElementVisible("div.discipline-record.add-row button.btn.btn-default.btn-blue.select-pdf", 10000)
            ////////////////////////////.setValue('div.discipline-record.add-row input#RequiredFile', require('path').resolve(__dirname + '/../AttachmentFiles/Facilities IT Attachment.pdf'))
            //////////////////////////////save
            ////////////////////////////.waitForElementVisible("div.discipline-record.add-row input.btn.btn-default.btn-blue.submit-discipline", 10000)
            ////////////////////////////.customClick("div.discipline-record.add-row input.btn.btn-default.btn-blue.submit-discipline")
            //////////////////////////////confirm submit
            ////////////////////////////.waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
            ////////////////////////////.customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")
            //////////////////////////////assert file upload
            ////////////////////////////.assert.containsText("div.discipline-record:last-child label.required-filename", "Facilities IT Attachment.pdf")












      ////////////////EMPLOYEES SECTION//////////////////////
            //Complete Employee Section
        // navigate to employees seciton
        browser.page.employee().openEmployeeDashboard();
        

        //create principal employees
        for (var i = 1; i <= EMPLOYEES; i++) {

            //assert correct fields show
            browser.page.employee().clickNewEmployeeLink();

            browser.waitForElementVisible("#null_Form div:nth-child(2) div:nth-child(2) div select option:nth-child(1)", 10000)  //select principal level
                .click("#null_Form div:nth-child(2) div:nth-child(2) div select option:nth-child(1)")
                //check for principal fields
                .assert.visible("#null_Form div:nth-child(4) div:nth-child(1) div:nth-child(2) div input")
                .assert.visible("#null_Form div:nth-child(4) div:nth-child(1) div:nth-child(3) div input")
                .assert.visible("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(1) div input")
                .assert.visible("#null_Form div:nth-child(3) div:nth-child(1) div input")
                .assert.visible("#null_Form div:nth-child(4) div:nth-child(1) div.col-xs-12.col-sm-4 div input")
                .assert.visible("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(2) div input")
                .assert.visible("#null_Form div:nth-child(4) div:nth-child(3) div textarea")
                .waitForElementVisible("#null_Form div:nth-child(2) div:nth-child(2) div select")
                //select associate level
                .click("#null_Form div:nth-child(2) div:nth-child(2) div select option:nth-child(2)")
                //check associate fields
                .assert.visible("#null_Form div:nth-child(3) div:nth-child(1) div input")
                .waitForElementVisible("#null_Form div:nth-child(2) div:nth-child(2) div select", 10000)
                //select technical level
                .click("#null_Form div:nth-child(2) div:nth-child(2) div select option:nth-child(3)")
                //check technical fields
                .assert.visible("#null_Form div:nth-child(3) div:nth-child(1) div input")
                .assert.visible("#null_Form div:nth-child(4) div:nth-child(1) div.col-xs-12.col-sm-4 div input")
                .assert.visible("#null_Form div:nth-child(4) div:nth-child(1) div div input")
                .assert.visible("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(1) div input")
                .assert.visible("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(2) div input")
                // Projects Schema - Hide

                .waitForElementVisible("#null_Form div:nth-child(2) div:nth-child(2) div select")//".add-row select[name='EmployeeLevelId']", 10000)
                //select other level
                .click("#null_Form div:nth-child(2) div:nth-child(2) div select option:nth-child(4)")//.add-row select[name='EmployeeLevelId'] option:nth-child(4)")
                //check other fields
                .assert.visible("#null_Form div:nth-child(3) div:nth-child(1) div input")

                //select principal level
                .waitForElementVisible("#null_Form div:nth-child(2) div:nth-child(2) div select option:nth-child(1)", 10000)
                .click("#null_Form div:nth-child(2) div:nth-child(2) div select option:nth-child(1)")
                //enter first name field
                .click("#null_Form div:nth-child(1) div:nth-child(2) div input")
                .waitForElementVisible("#null_Form div:nth-child(1) div:nth-child(2) div input", 10000)
                .setValue("#null_Form div:nth-child(1) div:nth-child(2) div input", "Principal")
                //enter last name field
                .setValue("#null_Form div:nth-child(1) div:nth-child(3) div input", "Employee")
                //enter residency field
                .customClick("#null_Form div:nth-child(1) div:nth-child(4) div select option:nth-child(1)")
                //enter job title field
                .customClick("#null_Form div:nth-child(2) div:nth-child(1) div input")
                .setValue("#null_Form div:nth-child(2) div:nth-child(1) div input", "CEO" + i)
                //enter years of experience field
                .customClick("#null_Form div:nth-child(3) div:nth-child(1) div input")
                .setValue("#null_Form div:nth-child(3) div:nth-child(1) div input", "10")
                //enter years of experience as principal
                .customClick("#null_Form div:nth-child(4) div:nth-child(1) div:nth-child(2) div input")
                .setValue("#null_Form div:nth-child(4) div:nth-child(1) div:nth-child(2) div input", "5")
                //enter years of experience at another firm
                .customClick("#null_Form div:nth-child(4) div:nth-child(1) div:nth-child(3) div input")
                .setValue("#null_Form div:nth-child(4) div:nth-child(1) div:nth-child(3) div input", "1")
                //enter years of experience not as principal
                .customClick("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(1) div input")
                   .setValue("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(1) div input", "5")
                //
                // Projects Schema
                //
                .customClick("#null_Form div:nth-child(4) div:nth-child(1) div.col-xs-12.col-sm-4 div input")
                .setValue("#null_Form div:nth-child(4) div:nth-child(1) div.col-xs-12.col-sm-4 div input", "10")
                .customClick("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(2) div input")
                .setValue("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(2) div input", "Director")
                .customClick("#null_Form div:nth-child(4) div:nth-child(3) div textarea")
                .setValue("#null_Form div:nth-child(4) div:nth-child(3) div textarea", "Many and Varied")
                //add educations, memberships, and registrations
                //add educations
            for (var j = 1; j <= ATTRIBUTE; j++) {
                    browser.waitForElementVisible("#null_Form div:nth-child(5) button", 10000)
                        .customClick("#null_Form div:nth-child(5) button");
                    browser.waitForElementVisible("#null_Form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(1) div input")
                        .setValue("#null_Form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(1) div input", "College")
                        .setValue("#null_Form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(2) div input", "Degree")
                        .setValue("#null_Form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(3) div input", "Specialization")
                    .setValue("#null_Form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(4) div input", "1990");
            }
            //add memberships
            for (var j = 1; j <= ATTRIBUTE; j++) {
                browser.waitForElementVisible("#null_Form div:nth-child(6) button", 10000)
                    .customClick("#null_Form div:nth-child(6) button")
                    .waitForElementVisible("#null_Form div:nth-child(6) div employee-membership:nth-child(" + j + ") div div:nth-child(1) div input", 10000)
                    .setValue("#null_Form div:nth-child(6) div employee-membership:nth-child(" + j + ") div div:nth-child(1) div input", "Membership");
            }

            //add regisrations
            for (var j = 1; j <= ATTRIBUTE; j++) {
                browser.waitForElementVisible("#null_Form div:nth-child(7) button", 10000)
                    .customClick("#null_Form div:nth-child(7) button")
                    .waitForElementVisible("#null_Form div:nth-child(7) div employee-registration:nth-child(" + j + ") div div:nth-child(1) div input", 10000)
                    .setValue("#null_Form div:nth-child(7) div employee-registration:nth-child(" + j + ") div div:nth-child(1) div input", "Type")
                    .setValue("#null_Form div:nth-child(7) div employee-registration:nth-child(" + j + ") div div:nth-child(2) div input", "1990");
            }
            browser.pause(2000);

            //submit form
            browser.waitForElementVisible("#EmployeeRow div div div div csp-employee:nth-child(" + i + ") div div div div div div form button:nth-of-type(2)", 10000)
                .customClick("#EmployeeRow div div div div csp-employee:nth-child(" + i + ") div div div div div div form button:nth-of-type(2)", 10000)
            //wait for confirmation message to show
                .pause(2000)
                .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 25000)
                .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")

            //Open Employees
                .waitForElementVisible("#sidebar-menu div:nth-child(1) ul div.employees.row div li:nth-child(" + i + ") a", 10000)
                .customClick("#sidebar-menu div:nth-child(1) ul div.employees.row div li:nth-child(" + i + ") a")
                .pause(5000);

            //Open First Employee
            browser.waitForElementVisible("#sidebar-menu div:nth-child(1) ul div.employees.row div li ul li:last-child a", 10000)
                .customClick("#sidebar-menu div:nth-child(1) ul div.employees.row div li ul li:last-child a")
                .pause(2000);
            

            //Assert Values added correctly
            for (var j = 1; j <= ATTRIBUTE; j++) {
                if (i == 1) {
                    browser.waitForElementVisible("form employee-education:nth-child(" + j + ") > div > div:nth-child(1) > div > input.form-control.required-validate.ng-pristine.ng-valid", 10000)//"form div:nth-child(5) div:last-child employee-education:nth-child(" + (j) + ") div div:nth-child(1) divform-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed input", 10000)//.form-control.required-validate.ng-pristine.ng-valid.ng-touched.parsley-success", 10000)//".employee-row:last-child form:nth-child(" + j + ") input[name='College']", 10000)
                        .assert.valueContains("form employee-education:nth-child(" + j + ") > div > div:nth-child(1) > div > input.form-control.required-validate.ng-pristine.ng-valid", "College")
                        //.assert.valueContains("form employee-education:nth-child(" + i + ") > div > div:nth-child(2) > div > input.form-control.required-validate.ng-pristine.ng-valid", "Degree")
                        .assert.valueContains("form employee-education:nth-child(" + j + ") > div > div:nth-child(3) > div > input.form-control.required-validate.ng-pristine.ng-valid", "Specialization")
                        .assert.valueContains("form employee-education:nth-child(" + j + ") > div > div:nth-child(4) > div > input.form-control.required-validate.ng-pristine.ng-valid", "1990");
                }//else {
                //    //Grab last employee Id for enterring form
                //    var empFormId = "#";
                //    browser.execute(function() {
                //        empFormId += $("#sidebar-menu div:nth-child(1) ul div.employees.row div li ul li:last-child a").data("id");
                //        console.log("---Emp#: " + i + " ------Data-ID----------: " + empFormId);
                //    });

                //    //var elements = browser.useCss("form employee-education:nth-child(" + j + ") > div > div:nth-child(1) > div > input");
                //    //elements.forEach((c) => browser.customClick(c));
                //    browser.waitForElementVisible(empFormId + " form employee-education:nth-child(" + j + ") > div > div:nth-child(1) > div > input", 10000)//"form div:nth-child(5) div:last-child employee-education:nth-child(" + (j) + ") div div:nth-child(1) divform-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed input", 10000)//.form-control.required-validate.ng-pristine.ng-valid.ng-touched.parsley-success", 10000)//".employee-row:last-child form:nth-child(" + j + ") input[name='College']", 10000)
                //        .assert.valueContains(empFormId + " form employee-education:nth-child(" + j + ") > div > div:nth-child(1) > div > input", "College")
                //        //.assert.valueContains(empFormId + " form employee-education:nth-child(" + i + ") > div > div:nth-child(2) > div > input", "Degree")
                //        .assert.valueContains(empFormId + " form employee-education:nth-child(" + j + ") > div > div:nth-child(3) > div > input", "Specialization")
                //        .assert.valueContains(empFormId + " form employee-education:nth-child(" + j + ") > div > div:nth-child(4) > div > input", "1990");
                //}
            }
            
            for (var j = 1; j <= ATTRIBUTE; j++) {
                if (i == 1) {
                    browser.waitForElementVisible( "form employee-membership:nth-child(" + j + ") > div > div:nth-child(1) > div > input", 80000) //".employee-row:last-child  form:nth-child(" + j + ") input[name='Name']", 10000)
                        .assert.valueContains("form employee-membership:nth-child(" + j + ") > div > div:nth-child(1) > div > input", "Membership");
                }//else {
                //    //Grab last employee Id for enterring form
                //    var empFormId = "#";
                //    browser.execute(function() {
                //        empFormId += $("#sidebar-menu div:nth-child(1) ul div.employees.row div li ul li:last-child a").data("id");
                //        console.log("---Emp#: " + i + " ------Data-ID----------: " + empFormId);
                //    });
                //    browser.waitForElementVisible(empFormId + " form employee-membership:nth-child(" + j + ") > div > div:nth-child(1) > div > input", 80000) //".employee-row:last-child  form:nth-child(" + j + ") input[name='Name']", 10000)
                //        .assert.valueContains(empFormId + " form employee-membership:nth-child(" + j + ") > div > div:nth-child(1) > div > input", "Membership");
                //}
            }
            
            for (var j = 1; j <= ATTRIBUTE; j++) {
                if (i == 1) {
                    browser.waitForElementVisible("form employee-registration:nth-child(" + j + ") > div > div:nth-child(1) > div > input", 10000)
                        .assert.valueContains("form employee-registration:nth-child(" + j + ") > div > div:nth-child(1) > div > input", "Type")
                        .assert.valueContains("form employee-registration:nth-child(" + j + ") > div > div:nth-child(2) > div > input", "1990");
                }//else {
                //    //Grab last employee Id for enterring form
                //    var empFormId = "#";
                //    browser.execute(function() {
                //        empFormId += $("#sidebar-menu div:nth-child(1) ul div.employees.row div li ul li:last-child a").data("id");
                //        console.log("---Emp#: " + i + " ------Data-ID----------: " + empFormId);
                //    });
                //    browser.waitForElementVisible(empFormId + " form employee-registration:nth-child(" + j + ") > div > div:nth-child(1) > div > input", 10000)
                //        .assert.valueContains(empFormId + " form employee-registration:nth-child(" + j + ") > div > div:nth-child(1) > div > input", "Type")
                //        .assert.valueContains(empFormId + " form employee-registration:nth-child(" + j + ") > div > div:nth-child(2) > div > input", "1990");
                //}
            }
            
        }


        ////create associate employees
        //for (var i = 1; i <= EMPLOYEES; i++) {
        //    browser.waitForElementVisible("#sidebar-menu div.employees.row a.side-menu-create", 10000)
        //        .customClick("#sidebar-menu div.employees.row a.side-menu-create")

        //    //enter first name field
        //        .waitForElementVisible("#null_Form div:nth-child(1) div:nth-child(2) div input", 10000) //"#EmployeeRow .add-row  #form0 input[name='FirstName']", 10000)
        //        .setValue("#null_Form div:nth-child(1) div:nth-child(2) div input", "Associate") //"#EmployeeRow .add-row #form0 input[name='FirstName']", "Associate")
        //    //enter last name field
        //        .setValue("#null_Form div:nth-child(1) div:nth-child(3) div input", "Employee") //"#EmployeeRow .add-row  input[name='LastName']", "Employee")
        //    //select associate level
        //        .waitForElementVisible("#null_Form div:nth-child(1) div:nth-child(4) div select", 10000)
        //        .click("#null_Form div:nth-child(1) div:nth-child(4) div select option:nth-child(2)") //".add-row select[name='EmployeeLevelId'] option:nth-child(2)")
        //    //enter residency field
        //        .customClick("#null_Form div:nth-child(1) div:nth-child(4) div select option:nth-child(1)") //"#EmployeeRow .add-row  select[name='Residency']")
        //                            //.setValue("#EmployeeRow .add-row  select[name='Residency']", "Hawaii")
        //    //enter job title field
        //        .customClick("#null_Form div:nth-child(2) div:nth-child(1) div input") //"#EmployeeRow .add-row  input[name='Title']")
        //        .setValue("#null_Form div:nth-child(2) div:nth-child(1) div input", "CEO" + i) //"#EmployeeRow .add-row  input[name='Title']", "CEO" + i)
        //        //enter years of experience field
        //        .customClick("#null_Form div:nth-child(3) div:nth-child(1) div input") //"#EmployeeRow .add-row input[name='YearsExperience']")
        //        .setValue("#null_Form div:nth-child(3) div:nth-child(1) div input", "10") //"#EmployeeRow .add-row input[name='YearsExperience']", "10")
        //        //enter years of experience with this firm field
        //        .customClick("#null_Form div:nth-child(3) div:nth-child(2) div input") //"#EmployeeRow .add-row input[name='YearsExperience']")
        //        .setValue("#null_Form div:nth-child(3) div:nth-child(2) div input", "4") //"#EmployeeRow .add-row input[name='YearsExperience']", "10")
        //    //add educations, memberships, and registrations
        //    //add educations

        //    //add educations, memberships, and registrations
        //    //add educations
        //    for (var j = 1; j <= ATTRIBUTE; j++) {
        //        browser.waitForElementVisible("#null_Form div:nth-child(5) button", 10000)
        //            .customClick("#null_Form div:nth-child(5) button");
        //        browser.waitForElementVisible("#null_Form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(1) div input")//".employee-row:last-child form:nth-child(" + j + ") input[name='College']", 10000)
        //            .setValue("#null_Form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(1) div input", "College")
        //            .setValue("#null_Form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(2) div input", "Degree")
        //            .setValue("#null_Form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(3) div input", "Specialization")
        //            .setValue("#null_Form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(4) div input", "1990");
        //    }
        //    //add memberships
        //    for (var j = 1; j <= ATTRIBUTE; j++) {
        //        browser.waitForElementVisible("#null_Form div:nth-child(6) button", 10000)
        //            .customClick("#null_Form div:nth-child(6) button")
        //            .waitForElementVisible("#null_Form div:nth-child(6) div employee-membership:nth-child(" + j + ") div div:nth-child(1) div input", 10000) //".employee-row:last-child  form:nth-child(" + j + ") input[name='Name']", 10000)
        //            .setValue("#null_Form div:nth-child(6) div employee-membership:nth-child(" + j + ") div div:nth-child(1) div input", "Membership");
        //    }

        //    //add regisrations
        //    for (var j = 1; j <= ATTRIBUTE; j++) {
        //        browser.waitForElementVisible("#null_Form div:nth-child(7) button", 10000)//"#null_Form div:nth-child(7) button", 10000)
        //            .customClick("#null_Form div:nth-child(7) button")
        //            .waitForElementVisible("#null_Form div:nth-child(7) div employee-registration:nth-child(" + j + ") div div:nth-child(1) div input", 10000)
        //            .setValue("#null_Form div:nth-child(7) div employee-registration:nth-child(" + j + ") div div:nth-child(1) div input", "Type")
        //            .setValue("#null_Form div:nth-child(7) div employee-registration:nth-child(" + j + ") div div:nth-child(2) div input", "1990");
        //    }
        //    browser.pause(2000);

        //    //submit form
        //    var index = +i + +EMPLOYEES;
        //    browser.waitForElementVisible("#EmployeeRow div div div div csp-employee:nth-child(" + index + ") div div div div div div form button:nth-of-type(2)", 10000)//#null_Form button.btn.btn-default.btn-blue", 10000)
        //        .customClick("#EmployeeRow div div div div csp-employee:nth-child(" + index + ") div div div div div div form button:nth-of-type(2)", 10000)//#null_Form button.btn.btn-default.btn-blue")
        //        //wait for confirmation message to show
        //        .pause(2000)
        //        .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 25000)
        //        .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")

        //        //Open Employees
        //        .waitForElementVisible("#sidebar-menu div:nth-child(1) ul div.employees.row div li a", 10000)
        //        .customClick("#sidebar-menu div:nth-child(1) ul div.employees.row div li a")
        //        .pause(2000);
        //    //Open First Employee
        //    browser.waitForElementVisible("#sidebar-menu div:nth-child(1) ul div.employees.row div li ul li:last-child a", 10000)
        //        .customClick("#sidebar-menu div:nth-child(1) ul div.employees.row div li ul li:last-child a");
        //    ////Open Employees Education
        //    //browser.waitForElementVisible("#EmployeeRow div div div #personnel-panel csp-employee div div div div div div form > div:nth-child(5) > button", 20000)
        //    //    .customClick("#EmployeeRow div div div #personnel-panel csp-employee div div div div div div form > div:nth-child(5) > button");
        //    ////Open Employees Membership
        //    //browser.waitForElementVisible("#EmployeeRow div div div #personnel-panel csp-employee div div div div div div form > div:nth-child(6) > button", 20000)
        //    //    .customClick("#EmployeeRow div div div #personnel-panel csp-employee div div div div div div form > div:nth-child(6) > button");
        //    ////Open Employees Resitraion
        //    //browser.waitForElementVisible("#EmployeeRow div div div #personnel-panel csp-employee div div div div div div form > div:nth-child(7) > button", 20000)
        //    //    .customClick("#EmployeeRow div div div #personnel-panel csp-employee div div div div div div form > div:nth-child(7) > button");


        //    //TODO: Fix Assert Values added correctly
        //    //for (var j = 1; j <= ATTRIBUTE; j++) {
        //    //    if (i == 1) {
        //    //        browser.waitForElementVisible("form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(1) div input")//".employee-row:last-child form:nth-child(" + j + ") input[name='College']", 10000)
        //    //            .assert.valueContains("form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(1) div input", "College")
        //    //            //.assert.valueContains("form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(2) div input", "Degree")
        //    //            .assert.valueContains("form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(3) div input", "Specialization")
        //    //            .assert.valueContains("form div:nth-child(5) div employee-education:nth-child(" + (j) + ") div div:nth-child(4) div input", "1990");
        //    //    }
        //    //}

        //    //for (var j = 1; j <= ATTRIBUTE; j++) {
        //    //    if (i == 1) {
        //    //        browser.waitForElementVisible("form div:nth-child(6) div employee-membership:nth-child(" + j + ") div div:nth-child(1) div input", 10000) //".employee-row:last-child  form:nth-child(" + j + ") input[name='Name']", 10000)
        //    //            .assert.valueContains("form div:nth-child(6) div employee-membership:nth-child(" + j + ") div div:nth-child(1) div input", "Membership");
        //    //        //browser.waitForElementVisible("form div:nth-child(6) div employee-membership:nth-child(" + j + ") div div:nth-child(1) div input", 10000) //".employee-row:last-child  form:nth-child(" + j + ") input[name='Name']", 10000)
        //    //        //    .assert.valueContains("form div:nth-child(6) div employee-membership:nth-child(" + j + ") div div:nth-child(1) div input", "Membership");
        //    //        // browser.waitForElementVisible(".employee-row:last-child  form:nth-child(" + j + ") input[name='Name']", 10000)
        //    //        // .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Name']", "Membership")
        //    //    }
        //    //}

        //    //for (var j = 1; j <= ATTRIBUTE; j++) {
        //    //    if (i == 1) {
        //    //        browser.waitForElementVisible("form div:nth-child(7) div employee-registration:nth-child(" + j + ") div div:nth-child(1) div input", 10000)
        //    //            .assert.valueContains("form div:nth-child(7) div employee-registration:nth-child(" + j + ") div div:nth-child(1) div input", "Type")
        //    //            .assert.valueContains("form div:nth-child(7) div employee-registration:nth-child(" + j + ") div div:nth-child(2) div input", "1990");
        //    //        // browser.waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", 10000)
        //    //        // .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", "Type")
        //    //        // .assert.valueContains(".employee-row:last-child .registrations-container form:nth-child(" + j + ") input[name='Year']", "1990")
        //    //    }
        //    //}



        //    ///////////////////// START - SUB OBJECTS//////////////////////
        //    //for (var j = 1; j <= ATTRIBUTE; j++) {
        //    //    if (j == 1) {
        //    //        browser.waitForElementVisible("#null_Form div:nth-child(5) button", 10000)
        //    //        .customClick("#null_Form div:nth-child(5) button")
        //    //    }
        //    //    else {
        //    //        browser.waitForElementVisible("#null_Form div:nth-child(4) button", 10000)
        //    //        .customClick("#null_Form div:nth-child(4) button")
        //    //    }

        //    //    browser.waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='College']", 10000)
        //    //    .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='College']", "College")
        //    //    .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Degree']", "Degree")
        //    //    .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Specialization']", "Specialization")
        //    //    .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Year']", "1990")
        //    //}

        //    ////add memberships
        //    //for (var j = 1; j <= ATTRIBUTE; j++) {
        //    //    browser.waitForElementVisible("#null_Form div:nth-child(6) button", 10000)
        //    //    .customClick("#null_Form div:nth-child(6) button")
        //    //    .waitForElementVisible(".employee-row:last-child  form:nth-child(" + j + ") input[name='Name']", 10000)
        //    //    .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Name']", "Membership")
        //    //}

        //    ////add regisrations
        //    //for (var j = 1; j <= ATTRIBUTE; j++) {
        //    //    browser.waitForElementVisible("#null_Form div:nth-child(7) button", 10000)
        //    //    .customClick("#null_Form div:nth-child(7) button")
        //    //    .waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", 10000)
        //    //    .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", "Type")
        //    //    .setValue(".employee-row:last-child .registrations-container form:nth-child(" + j + ") input[name='Year']", "1990")
        //    //}

        //    ////submit form
        //    //browser.waitForElementVisible("#null_Form button.btn.btn-default.btn-blue", 10000)
        //    //.customClick("#null_Form button.btn.btn-default.btn-blue")
        //    ////wait for confirmation message to show
        //    //.waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
        //    //.customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")



        //    //for (var j = 1; j <= ATTRIBUTE; j++) {
        //    //    browser.waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='College']", 10000)
        //    //    .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='College']", "College")
        //    //    .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Degree']", "Degree")
        //    //    .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Specialization']", "Specialization")
        //    //    .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Year']", "1990")
        //    //}


        //    //for (var j = 1; j <= ATTRIBUTE; j++) {
        //    //    browser.waitForElementVisible(".employee-row:last-child  form:nth-child(" + j + ") input[name='Name']", 10000)
        //    //    .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Name']", "Membership")
        //    //}


        //    //for (var j = 1; j <= ATTRIBUTE; j++) {
        //    //    browser.waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", 10000)
        //    //    .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", "Type")
        //    //    .assert.valueContains(".employee-row:last-child .registrations-container form:nth-child(" + j + ") input[name='Year']", "1990")
        //    //}
        //    /////////////////// END - SUB OBJECTS///////////////////////
        //}

        ////create technical employees
        //for (var i = 1; i <= EMPLOYEES; i++) {
        //    browser.waitForElementVisible("#sidebar-menu div.employees.row a.side-menu-create", 10000)
        //    .customClick("#sidebar-menu div.employees.row a.side-menu-create")
        //    //enter first name field
        //    .waitForElementVisible("#EmployeeRow .add-row  #form0 input[name='FirstName']", 10000)
        //    .setValue("#EmployeeRow .add-row #form0 input[name='FirstName']", "Technical")
        //    //enter last name field
        //    .setValue("#EmployeeRow .add-row  input[name='LastName']", "Employee")
        //    .waitForElementVisible(".add-row select[name='EmployeeLevelId']", 10000)
        //    //select associate level
        //    .click(".add-row select[name='EmployeeLevelId'] option:nth-child(3)")
        //    //enter residency field
        //    .customClick("#EmployeeRow .add-row  select[name='Residency']")
        //    .setValue("#EmployeeRow .add-row  select[name='Residency']", "Hawaii")
        //    //enter job title field
        //    .customClick("#EmployeeRow .add-row  input[name='Title']")
        //    .setValue("#EmployeeRow .add-row  input[name='Title']", "CEO" + i)
        //    //enter years of experience field
        //    .setValue("#EmployeeRow .add-row input[name='YearsExperience']", "2")
        //    .setValue("#null_Form div:nth-child(4) div:nth-child(1) div.col-xs-12.col-sm-4 div input", "3")
        //    .setValue("#EmployeeRow .add-row input[name='LastFirm']", "FIRM")
        //    .setValue("#EmployeeRow .add-row input[name='YearsExperienceLastFirm']", "4")
        //    .setValue("#EmployeeRow .add-row input[name='YearsExperienceOtherFirms']", "5")

        //    //add educations, memberships, and registrations
        //    //add educations

        //    for (var j = 1; j <= ATTRIBUTE; j++) {
        //        if (j == 1) {
        //            browser.waitForElementVisible("#null_Form div:nth-child(5) button", 10000)
        //            .customClick("#null_Form div:nth-child(5) button")
        //        }
        //        else {
        //            browser.waitForElementVisible("#null_Form div:nth-child(4) button", 10000)
        //            .customClick("#null_Form div:nth-child(4) button")
        //        }

        //        browser.waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='College']", 10000)
        //        .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='College']", "College")
        //        .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Degree']", "Degree" + j)
        //        .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Specialization']", "Specialization")
        //        .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Year']", "1990")
        //    }

        //    //add regisrations
        //    for (var j = 1; j <= ATTRIBUTE; j++) {
        //        browser.waitForElementVisible("#null_Form div:nth-child(7) button", 10000)
        //        .customClick("#null_Form div:nth-child(7) button")
        //        .waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", 10000)
        //        .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", "Type")
        //        .setValue(".employee-row:last-child .registrations-container form:nth-child(" + j + ") input[name='Year']", "1990")
        //    }

        //    //submit form
        //    browser.waitForElementVisible("#null_Form button.btn.btn-default.btn-blue", 10000)
        //    .customClick("#null_Form button.btn.btn-default.btn-blue")
        //    //wait for confirmation message to show
        //    .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
        //    .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")


        //    for (var j = 1; j <= ATTRIBUTE; j++) {
        //        browser.waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='College']", 10000)
        //        .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='College']", "College")
        //        .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Degree']", "Degree")
        //        .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Specialization']", "Specialization")
        //        .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Year']", "1990")
        //    }

        //    for (var j = 1; j <= ATTRIBUTE; j++) {
        //        browser.waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", 10000)
        //        .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", "Type")
        //        .assert.valueContains(".employee-row:last-child .registrations-container form:nth-child(" + j + ") input[name='Year']", "1990")
        //    }

        //}

        ////create other employees
        //for (var i = 1; i <= EMPLOYEES; i++) {
        //    browser.waitForElementVisible("#sidebar-menu div.employees.row a.side-menu-create", 10000)
        //    .customClick("#sidebar-menu div.employees.row a.side-menu-create")
        //    //enter first name field
        //    .waitForElementVisible("#EmployeeRow .add-row  #form0 input[name='FirstName']", 10000)
        //    .setValue("#EmployeeRow .add-row #form0 input[name='FirstName']", "Other")
        //    //enter last name field
        //    .setValue("#EmployeeRow .add-row  input[name='LastName']", "Employee")
        //    .waitForElementVisible(".add-row select[name='EmployeeLevelId']", 10000)
        //    //select associate level
        //    .click(".add-row select[name='EmployeeLevelId'] option:nth-child(4)")
        //    //enter residency field
        //    .customClick("#EmployeeRow .add-row  select[name='Residency']")
        //    .setValue("#EmployeeRow .add-row  select[name='Residency']", "Hawaii")
        //    //enter job title field
        //    .customClick("#EmployeeRow .add-row  input[name='Title']")
        //    .setValue("#EmployeeRow .add-row  input[name='Title']", "CEO" + i)
        //    //enter years of experience field
        //    .customClick("#EmployeeRow .add-row input[name='YearsExperience']")
        //    .setValue("#EmployeeRow .add-row input[name='YearsExperience']", "2")
        //    .setValue("#null_Form div:nth-child(4) div:nth-child(1) div.col-xs-12.col-sm-4 div input", "3")
        //    .setValue("#EmployeeRow .add-row input[name='LastFirm']", "FIRM")
        //    .setValue("#EmployeeRow .add-row input[name='YearsExperienceLastFirm']", "4")
        //    .setValue("#EmployeeRow .add-row input[name='YearsExperienceOtherFirms']", "5")

        //    //add educations, memberships, and registrations
        //    //add educations

        //    for (var j = 1; j <= ATTRIBUTE; j++) {
        //        if (j == 1) {
        //            browser.waitForElementVisible("#null_Form div:nth-child(5) button", 10000)
        //            .customClick("#null_Form div:nth-child(5) button")
        //        }
        //        else {
        //            browser.waitForElementVisible("#null_Form div:nth-child(4) button", 10000)
        //            .customClick("#null_Form div:nth-child(4) button")
        //        }

        //        browser.waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='College']", 10000)
        //        .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='College']", "College")
        //        .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Degree']", "Degree")
        //        .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Specialization']", "Specialization")
        //        .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Year']", "1990")
        //    }


        //    //add regisrations
        //    for (var j = 1; j <= ATTRIBUTE; j++) {
        //        browser.waitForElementVisible("#null_Form div:nth-child(7) button", 10000)
        //        .customClick("#null_Form div:nth-child(7) button")
        //        .waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", 10000)
        //        .setValue(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", "Type")
        //        .setValue(".employee-row:last-child .registrations-container form:nth-child(" + j + ") input[name='Year']", "1990")
        //    }

        //    //submit form
        //    browser.waitForElementVisible("#null_Form button.btn.btn-default.btn-blue", 10000)
        //    .customClick("#null_Form button.btn.btn-default.btn-blue")
        //    //wait for confirmation message to show
        //    .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
        //    .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")

        //    for (var j = 1; j <= ATTRIBUTE; j++) {
        //        browser.waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='College']", 10000)
        //        .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='College']", "College")
        //        .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Degree']", "Degree")
        //        .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Specialization']", "Specialization")
        //        .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Year']", "1990")
        //    }


        //    for (var j = 1; j <= ATTRIBUTE; j++) {
        //        browser.waitForElementVisible(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", 10000)
        //        .assert.valueContains(".employee-row:last-child form:nth-child(" + j + ") input[name='Type']", "Type")
        //        .assert.valueContains(".employee-row:last-child .registrations-container form:nth-child(" + j + ") input[name='Year']", "1990")
        //    }
        //}

        
        ////////////////Project Section////////////

        browser.page.project().selectProjectDropDown()
            .pause(2000);

        //create new project 
        browser.page.project().addProject(2000, "Test Name", "123 Address st", "Apt. A", "Honolulu", "12345", "This is a description...", 2, 25, 50, 100, "Lead Name", "lead@email.com", "Owner Name", "123 Owner st", "Owner apt. A", "Owner Honolulu", "12345", "1231231234", "3213214321");



            //assert all fields are completed
            browser.waitForElementVisible("#CompanyRow .col-xs-6.accordion-status p", 10000)
            .assert.containsText("#CompanyRow .col-xs-6.accordion-status p", "Complete")
            .waitForElementVisible("#DisciplinesRow .col-xs-6.accordion-status p", 10000)
            .assert.containsText("#DisciplinesRow .col-xs-6.accordion-status p", "Complete")
            .waitForElementVisible("#BranchesRow .col-xs-6.accordion-status p", 10000)
            .assert.containsText("#BranchesRow .col-xs-6.accordion-status p", "Complete")
            .waitForElementVisible("#EmployeeRow .col-xs-6.accordion-status p", 10000)
            .assert.containsText("#EmployeeRow .col-xs-6.accordion-status p", "Complete")
            .waitForElementVisible("#ProjectsRow .col-xs-6.accordion-status p", 10000)
            .assert.containsText("#ProjectsRow .col-xs-6.accordion-status p", "Complete")

        //submit qualifications
            .waitForElementVisible("#SubmitQualifications", 10000)
            .customClick("#SubmitQualifications")
            .waitForElementVisible("#submission-dialog  input.btn.btn-default.btn-blue", 10000)
            .click("#submission-dialog  input.btn.btn-default.btn-blue")
            .waitForElementVisible("#SubmitterTitle:first-of-type + ul .parsley-custom-error-message", 10000)
            .assert.containsText("#SubmitterTitle:first-of-type + ul .parsley-custom-error-message", "Job Title is required.")
            .assert.containsText("#parsley-id-multiple-SubmitterAuthorized", "Authorization is required.")
            .waitForElementVisible("#SubmitterTitle", 10000)
            .setValue("#SubmitterTitle", "TITLE")
            .waitForElementVisible("#SubmitterAuthorized", 10000)
            .customClick("#SubmitterAuthorized")
            .waitForElementVisible("#submission-dialog  input.btn.btn-default.btn-blue", 200000)
            .customClick("#submission-dialog  input.btn.btn-default.btn-blue")

        //Assert Qualificaitons has been submitted
            .waitForElementVisible(".container.body .right_col div a:nth-child(4)", 120000)
            .assert.title("Qualifications submitted successfully. - Consultant Portal")
             //view submitted qualifications
            .waitForElementVisible("#viewSubmittedQualifications", 10000)
            .customClick("#viewSubmittedQualifications")
            //Check For Expected Documents
            .waitForElementVisible("div.submittal-year-group div:nth-child(3) table tbody tr:nth-child(2) td:nth-child(1) a", 10000)
            .assert.containsText("div.submittal-year-group div:nth-child(3) table tbody tr:nth-child(2) td:nth-child(1) a", "AZ Firm-2018-Attachment A.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(3) table tbody tr:nth-child(3) td:nth-child(1) a", "AZ Firm-2018-DPW 120.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(2) td:nth-child(1) ul li a", "DPW 120.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(2) td:nth-child(2)", "Landscape Architecture")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(3) td:nth-child(1) ul li a", "DPW 120.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(3) td:nth-child(2)", "Engineering Planning & Design - Civil - General")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(4) td:nth-child(1) ul li a", "DPW 120.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(4) td:nth-child(2)", "Engineering Planning & Design - Civil - Hydraulics")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(5) td:nth-child(1) ul li a", "Various Service Attachment.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(5) td:nth-child(2)", "Engineering Planning & Design - Civil - Transportation")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(6) td:nth-child(1) ul li a", "Facilities IT Attachment.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(5) table tbody tr:nth-child(6) td:nth-child(2)", "Engineering Planning & Design - Civil - Sanitary")
            .assert.containsText("div.submittal-year-group div:nth-child(7) table tbody tr:nth-child(2) td:nth-child(1) a", "TestFile.pdf")
            .assert.containsText("div.submittal-year-group div:nth-child(7) table tbody tr:nth-child(2) td:nth-child(2)", "Transmittal Letter")



        //Delete Company
        companyPage.page.company().deleteCompany();
            browser.end()
    }
};