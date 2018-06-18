module.exports = {
    url: function () {
        return this.api.launchUrl;
    },
    elements: {
        addEmployeeLink: "#EmployeeRow #add-personnel",
        saveBtn: "#EmployeeRow .edit-submit",
    },
    commands: [{
        signIn: function (user = 'user0@seed.net', password = 'Password0') {
            this.api.page.login().navigate().signIn(user, password);
            return this.api;
        },
            openEmployeeDashboard: function () {
                this.waitForElementVisible("#EmployeeRow button.employees-parent", 20000)
                    .customClick("#EmployeeRow button.employees-parent");
                return this.api;
            },
            clickNewEmployeeLink: function () {
                this.waitForElementVisible("#EmployeeRow .add-button", 60000)
                    .customClick("#EmployeeRow .add-button");
                return this.api;
            },
            addEmployee: function (empLevel, firstName, lastName, state, jobTitle, fieldYears, otherYears, firmPrincipal, yearsHere, firmName, 
                lastFirmYears, principalOtherFirms, notPrincipal, position, responsibilities, index, empCount, save = true) {
            
                    //enter first name field
                    this.waitForElementVisible("#null_Form div:nth-child(1) div:nth-child(2) div input")
                        .click("#null_Form div:nth-child(1) div:nth-child(2) div input")
                        .waitForElementVisible("#null_Form div:nth-child(1) div:nth-child(2) div input", 10000)
                        .setValue("#null_Form div:nth-child(1) div:nth-child(2) div input", firstName)
                        //enter last name field
                        .setValue("#null_Form div:nth-child(1) div:nth-child(3) div input", lastName)
                        //enter residency field
                        .customClick("#null_Form div:nth-child(1) div:nth-child(4) div select option:nth-child(" + state + ")")
                        //enter job title field
                        .customClick("#null_Form div:nth-child(2) div:nth-child(1) div input")
                        .setValue("#null_Form div:nth-child(2) div:nth-child(1) div input", jobTitle)

                        //select emp level
                        .waitForElementVisible("#null_Form div:nth-child(2) div:nth-child(2) div select option:nth-child(" + empLevel + ")", 10000)
                        .click("#null_Form div:nth-child(2) div:nth-child(2) div select option:nth-child(" + empLevel + ")")

                        //enter years of experience field
                        .customClick("#null_Form div:nth-child(3) div:nth-child(1) div input")
                        .setValue("#null_Form div:nth-child(3) div:nth-child(1) div input", fieldYears)


                        //enter years of with other firms
                        .customClick("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(1) div input")
                        .setValue("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(1) div input", otherYears)


                        //years experience this firm
                        .customClick("#null_Form div:nth-child(4) div:nth-child(1) div:nth-child(1) div input")
                        .setValue("#null_Form div:nth-child(4) div:nth-child(1) div:nth-child(1) div input", yearsHere)

                        //name of firm
                        .customClick("#null_Form div:nth-child(4) div:nth-child(1) div input")
                        .setValue("#null_Form div:nth-child(4) div:nth-child(1) div input", firmName)

                        //years experience this Principal firm
                        .customClick("#null_Form div:nth-child(4) div:nth-child(1) div:nth-child(2) div input")
                        .setValue("#null_Form div:nth-child(4) div:nth-child(1) div:nth-child(2) div input", firmPrincipal)

                        //enter years of experience with last firm
                        .customClick("#null_Form div:nth-child(4) div:nth-child(1) div:nth-child(3) div input")
                        .setValue("#null_Form div:nth-child(4) div:nth-child(1) div:nth-child(3) div input", principalOtherFirms);

                    if (empLevel > 1) {
                        this.customClick("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(2) div input")
                            .setValue("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(2) div input", lastFirmYears);
                    }

                    this.customClick("#null_Form div:nth-child(4) div:nth-child(1) div.col-xs-12.col-sm-4 div input")
                        .setValue("#null_Form div:nth-child(4) div:nth-child(1) div.col-xs-12.col-sm-4 div input", notPrincipal);


                    if (empLevel === 1) {
                        this.waitForElementVisible("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(2) div input")
                            .setValue("#null_Form div:nth-child(4) div:nth-child(2) div:nth-child(2) div input", position)
                            .waitForElementVisible("#null_Form div:nth-child(4) div:nth-child(3) div textarea")
                            .setValue("#null_Form div:nth-child(4) div:nth-child(3) div textarea", responsibilities);
                    }

                    if (save){
                        //submit form
                        this.waitForElementVisible("#EmployeeRow div div div div csp-employee:nth-child(" + empCount + ") div div div div div div form button:nth-of-type(2)", 10000)
                            .customClick("#EmployeeRow div div div div csp-employee:nth-child(" + empCount + ") div div div div div div form button:nth-of-type(2)", 10000);
                        //wait for confirmation message to show
                        this.api.pause(2000);
                        this.waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 25000)
                            .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button");
                    }
                },
                checkEmployeeLevelFields: function() {
                    var employeeLevel = "[ng-reflect-name='null_EmployeeLevelId']";
                    var yearsExperienceFirmPrincipal = "[ng-reflect-name='null_YearsExperienceFirmPrinci']";
                    var yearsExperiencePrincipalOtherFirms = "[ng-reflect-name='null_YearsExperiencePrincipalO']";
                    var yearsExperienceNotPrincipal = "[ng-reflect-name='null_YearsExperienceNotPrincip']";
                    var yearsExperience = "[ng-reflect-name='null_YearsExperience']";
                    var yearsExperienceFirm = "[ng-reflect-name='null_YearsExperienceFirm']";
                    var lastFirm = "[ng-reflect-name='null_LastFirm']";
                    var yearsLastFirm = "[ng-reflect-name='null_YearsExperienceLastFirm']";
                    var yearsOtherFirms = "[ng-reflect-name='null_YearsExperienceOtherFirms']";

                    this
                    //assert correct fields show
                    .waitForElementVisible(employeeLevel)
                    //select principal level
                    .click(employeeLevel + " option:nth-child(1)")
                    //check for principal fields
                    .assert.visible(yearsExperienceFirmPrincipal)
                    .assert.visible(yearsExperiencePrincipalOtherFirms)
                    .assert.visible(yearsExperienceNotPrincipal)
                    .assert.visible(yearsExperience)
                    .assert.visible(yearsExperienceFirm)  // Projects Schema
                    .assert.elementNotPresent(lastFirm)
                    .assert.elementNotPresent(yearsLastFirm)
                    .assert.elementNotPresent(yearsOtherFirms)

                    .waitForElementVisible(employeeLevel)
                    //select associate level
                    .click(employeeLevel + " option:nth-child(2)")
                    //check associate fields
                    .assert.elementNotPresent(yearsExperienceFirmPrincipal)
                    .assert.elementNotPresent(yearsExperiencePrincipalOtherFirms)
                    .assert.elementNotPresent(yearsExperienceNotPrincipal)
                    .assert.visible(yearsExperience)
                    .assert.visible(yearsExperienceFirm)
                    .assert.elementNotPresent(lastFirm)
                    .assert.elementNotPresent(yearsLastFirm)
                    .assert.elementNotPresent(yearsOtherFirms)

                    .waitForElementVisible(employeeLevel)
                    //select technical level
                    .click(employeeLevel + " option:nth-child(3)")
                    //check technical fields
                    .assert.elementNotPresent(yearsExperienceFirmPrincipal)
                    .assert.elementNotPresent(yearsExperiencePrincipalOtherFirms)
                    .assert.elementNotPresent(yearsExperienceNotPrincipal)
                    .assert.visible(yearsExperience)
                    .assert.visible(yearsExperienceFirm)
                    .assert.visible(lastFirm)
                    .assert.visible(yearsLastFirm)
                    .assert.visible(yearsOtherFirms)

                    .waitForElementVisible(employeeLevel)
                    //select other level
                    .click(employeeLevel + " option:nth-child(4)")
                    //check other fields
                    .assert.elementNotPresent(yearsExperienceFirmPrincipal)
                    .assert.elementNotPresent(yearsExperiencePrincipalOtherFirms)
                    .assert.elementNotPresent(yearsExperienceNotPrincipal)
                    .assert.visible(yearsExperience)
                    .assert.visible(yearsExperienceFirm)
                    .assert.visible(lastFirm)
                    .assert.visible(yearsLastFirm)
                    .assert.visible(yearsOtherFirms)
                    //select principal level
                    .click(employeeLevel + " option:nth-child(1)")
                },
        deleteEmployee: function () {
            this.api.pause(2000);
                    this.waitForElementVisible("csp-employee:nth-child(1) div div div.x_title div div.wrapper-icons div ul li:nth-child(1) button");
                    this.customClick("csp-employee:nth-child(1) div div div.x_title div div.wrapper-icons div ul li:nth-child(1) button");
                    this.api.pause(2000);
                    this.waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action div button.btn.btn-default.btn-blue.confirm-delete-item")
                        .customClick("#MessageModal div div div.modal-body div.pmd-modal-action div button.btn.btn-default.btn-blue.confirm-delete-item");
                    this.api.pause(2000);
                    this.waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button")
                        .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button");
                    return this.api;
                },
                registerCompany: function (ssn, firmName) {
                    this.api.page.login().registerCompany(ssn, firmName);
                    return this.api;
                },
                saveEmployee: function() {
                    //save
                    this.waitForElementVisible("#save-all-razor", 10000)
                        .customClick("#save-all-razor")
                        //confirm submit
                        .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 20000)
                        .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button");
                    return this.api;
                }
            }]
        };