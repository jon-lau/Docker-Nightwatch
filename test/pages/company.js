module.exports = {
    url: function () {
        return this.api.launchUrl;
    },
    elements: {
    },
    commands: [{
        signIn: function (user = 'user0@seed.net', password = 'Password0') {
            this.api.page.login().navigate().signIn(user, password);
            return this.api;
        },
            updateFirmName: function (firmName) {
                this.waitForElementVisible("#ExpandCompanyDashboard")
                    .customClick("#ExpandCompanyDashboard")

                    //Expand sub-accordians
                    .waitForElementVisible("#CompanyGeneralInfo div div div div div div ul li button.collapse-link")
                    .customClick("#CompanyGeneralInfo div div div div div div ul li button.collapse-link")
                    .waitForElementVisible("#CompanyInsuranceInfo > div > div > div.x_title > div > div.wrapper-icons > div > ul > li > button")
                    .customClick("#CompanyInsuranceInfo > div > div > div.x_title > div > div.wrapper-icons > div > ul > li > button")
                    .waitForElementVisible("#generalInfoForm div:nth-child(1) div:nth-child(1) div input")
                    .clearValue("#generalInfoForm div:nth-child(1) div:nth-child(1) div input");
                    this.api.pause(1000); //Staggering with pause allows field to be replaced properly
                    this.setValue("#generalInfoForm div:nth-child(1) div:nth-child(1) div input", firmName);
                this.api.pause(2000);


                if (firmName != null && firmName != "") { 
                    //Save form
                    this.waitForElementVisible('#generalInfoForm button.btn.btn-default.btn-blue')
                        .customClick('#generalInfoForm button.btn.btn-default.btn-blue');
                    this.api.pause(2000);
                    //confirm save
                    this.waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
                        .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")
                }
            
                return this.api;
            },
            deleteCompany: function () {
                this.api.pause(1000);
                this.waitForElementVisible("a.user-profile.dropdown-toggle")
                    .customClick("a.user-profile.dropdown-toggle");
                //click delete company
                this.waitForElementVisible("div.top_nav div nav ul li ul li:nth-child(5) a")
                    .customClick("div.top_nav div nav ul li ul li:nth-child(5) a");
                this.api.pause(1000);
                this.api.acceptAlert();
                //click delete company
                this.waitForElementVisible("body div div div.right_col div div:nth-child(3) div form input.btn.btn-default.btn-white")
                    .click("body div div div.right_col div div:nth-child(3) div form input.btn.btn-default.btn-white")
                    //check for compnay deletion confirmation
                    .waitForElementVisible('body')
                    .assert.title('Your company has been deleted - Consultant Portal')
                    .waitForElementVisible(".profile-dropdown-blocks a")
                    .customClick(".profile-dropdown-blocks a");
            },
            registerCompany: function (ssn, firmName) {
                this.api.page.login().registerCompany(ssn, firmName);
                return this.api;
            },
            updateProjectInfo: function (assignment, management, workflow, qualityControl, compProjPrime, conCostPrime, presProjPrime, 
                constProjPrime, compProjAssoc, constCompAssoc, presProjAssoc, constCostPresAssoc, save = true) {
                    this.api.waitForElementVisible("#projectInfoForm [ng-reflect-name='Assignment']")
                        .setValue("#projectInfoForm [ng-reflect-name='Assignment']", assignment)
                        .waitForElementVisible("#projectInfoForm [ng-reflect-name='ProjectManagementStructure']")
                        .setValue("#projectInfoForm [ng-reflect-name='ProjectManagementStructure']", management)
                        .waitForElementVisible("#projectInfoForm [ng-reflect-name='ProjectWorkflow']")
                        .setValue("#projectInfoForm [ng-reflect-name='ProjectWorkflow']", workflow)
                        .waitForElementVisible("#projectInfoForm [ng-reflect-name='QualityControl']")
                        .setValue("#projectInfoForm [ng-reflect-name='QualityControl']", qualityControl)

                        .waitForElementVisible("#projectInfoForm [ng-reflect-name='CompletedProjectsPrime']")
                        .setValue("#projectInfoForm [ng-reflect-name='CompletedProjectsPrime']", compProjPrime)
                        .waitForElementVisible("#projectInfoForm [ng-reflect-name='ConstructionCostCompletedPrime']")
                        .setValue("#projectInfoForm [ng-reflect-name='ConstructionCostCompletedPrime']", conCostPrime)
                        .waitForElementVisible("#projectInfoForm [ng-reflect-name='PresentProjectsPrime']")
                        .setValue("#projectInfoForm [ng-reflect-name='PresentProjectsPrime']", presProjPrime)
                        .waitForElementVisible("#projectInfoForm [ng-reflect-name='ConstructionCostPresentPrime']")
                        .setValue("#projectInfoForm [ng-reflect-name='ConstructionCostPresentPrime']", constProjPrime)
                        .waitForElementVisible("#projectInfoForm [ng-reflect-name='CompletedProjectsAssociate']")
                        .setValue("#projectInfoForm [ng-reflect-name='CompletedProjectsAssociate']", compProjAssoc)
                        .waitForElementVisible("#projectInfoForm [ng-reflect-name='ConstructionCostCompletedAssoc']")
                        .setValue("#projectInfoForm [ng-reflect-name='ConstructionCostCompletedAssoc']", constCompAssoc)
                        .waitForElementVisible("#projectInfoForm [ng-reflect-name='PresentProjectsAssociate']")
                        .setValue("#projectInfoForm [ng-reflect-name='PresentProjectsAssociate']", presProjAssoc)
                        .waitForElementVisible("#projectInfoForm [ng-reflect-name='ConstructionCostPresentAssocia']")
                        .setValue("#projectInfoForm [ng-reflect-name='ConstructionCostPresentAssocia']", constCostPresAssoc);
                    
                    this.api.pause(1000);
                    
                    this.assert.valueContains("#projectInfoForm [ng-reflect-name='Assignment']", assignment)
                    .assert.valueContains("#projectInfoForm [ng-reflect-name='ProjectManagementStructure']", management)
                    .assert.valueContains("#projectInfoForm [ng-reflect-name='ProjectWorkflow']", workflow)

                    .assert.valueContains("#projectInfoForm [ng-reflect-name='CompletedProjectsPrime']", compProjPrime)
                    .assert.valueContains("#projectInfoForm [ng-reflect-name='ConstructionCostCompletedPrime']", conCostPrime)
                    .assert.valueContains("#projectInfoForm [ng-reflect-name='PresentProjectsPrime']", presProjPrime)
                    .assert.valueContains("#projectInfoForm [ng-reflect-name='ConstructionCostPresentPrime']", constProjPrime)
                    .assert.valueContains("#projectInfoForm [ng-reflect-name='CompletedProjectsAssociate']", compProjAssoc)
                    .assert.valueContains("#projectInfoForm [ng-reflect-name='ConstructionCostCompletedAssoc']", constCompAssoc)
                    .assert.valueContains("#projectInfoForm [ng-reflect-name='PresentProjectsAssociate']", presProjAssoc)
                    .assert.valueContains("#projectInfoForm [ng-reflect-name='ConstructionCostPresentAssocia']", constCostPresAssoc)

                    if(save){
                        this
                        //Save form
                        .waitForElementVisible('#projectInfoForm button.btn.btn-default.btn-blue[type=submit]')
                        .customClick('#projectInfoForm button.btn.btn-default.btn-blue[type=submit]')
                        //confirm save
                        .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
                        .click("#MessageModal div div div.modal-body div.pmd-modal-action button")
                    }

                    return this.api;
                },
                updateGeneralInfo: function (firmName, typeDropDownNumber, estYear, stateNum, add1, add2, city, stateNum2, zip, phone, fax, inCharge, yearsInHI, licHI, nonLicHI) {
                    this.waitForElementVisible("#ExpandCompanyDashboard")
                        .customClick("#ExpandCompanyDashboard")

                        //Expand sub-accordians
                        .waitForElementVisible("#CompanyGeneralInfo div div div div div div ul li button.collapse-link")
                        .customClick("#CompanyGeneralInfo div div div div div div ul li button.collapse-link")
                        .waitForElementVisible("#CompanyInsuranceInfo > div > div > div.x_title > div > div.wrapper-icons > div > ul > li > button")
                        .customClick("#CompanyInsuranceInfo > div > div > div.x_title > div > div.wrapper-icons > div > ul > li > button")
                        .waitForElementVisible("#CompanyProjectInfo div div div.x_title div div.wrapper-icons div ul li button", 10000)
                        .customClick("#CompanyProjectInfo div div div.x_title div div.wrapper-icons div ul li button")

                        //Firm Name
                        .waitForElementVisible("#generalInfoForm div:nth-child(1) div:nth-child(1) div input")
                        .setValue("#generalInfoForm div:nth-child(1) div:nth-child(1) div input", firmName)
                        //change company type
                        .waitForElementVisible("#generalInfoForm div:nth-child(1) div:nth-child(3) div select option:nth-child(1)", 10000)
                        .click("#generalInfoForm div:nth-child(1) div:nth-child(3) div select option:nth-child(" + typeDropDownNumber + ")")
                        //set established year field
                        .waitForElementVisible("#generalInfoForm div:nth-child(2) div:nth-child(1) div input", 10000)
                        .setValue("#generalInfoForm div:nth-child(2) div:nth-child(1) div input", estYear)
                        //set state field
                        .waitForElementVisible("#generalInfoForm div:nth-child(2) div:nth-child(2) div select option:nth-child(1)", 10000)
                        .click("#generalInfoForm div:nth-child(2) div:nth-child(2) div select option:nth-child(" + stateNum + ")")
                        //set address line 1
                        .waitForElementVisible("#generalInfoForm div:nth-child(3) div:nth-child(1) div input", 10000)
                        .setValue("#generalInfoForm div:nth-child(3) div:nth-child(1) div input", add1)
                        //set address line 2
                        .waitForElementVisible("#generalInfoForm div:nth-child(3) div:nth-child(2) div input", 10000)
                        .setValue("#generalInfoForm div:nth-child(3) div:nth-child(2) div input", add2)
                        //set city field
                        .waitForElementVisible("#generalInfoForm div:nth-child(4) div:nth-child(1) div input", 10000)
                        .setValue("#generalInfoForm div:nth-child(4) div:nth-child(1) div input", city)
                        //set state field
                        .waitForElementVisible("#generalInfoForm div:nth-child(4) div:nth-child(2) div select option:nth-child(1)", 10000)
                        .click("#generalInfoForm div:nth-child(4) div:nth-child(2) div select option:nth-child(" + stateNum2 + ")");
                    //set zip code field
                    this.waitForElementVisible("#generalInfoForm div:nth-child(5) div:nth-child(1) div input", 10000);
                    var zipcodeTxt = this.api.useCss("#generalInfoForm div:nth-child(5) div:nth-child(1) div input");
                    zip.split("").forEach((c) => zipcodeTxt.sendKeys("#generalInfoForm div:nth-child(5) div:nth-child(1) div input", c));

                    //set phone number field
                    this.waitForElementVisible("#generalInfoForm div:nth-child(5) div:nth-child(2) div input", 10000);
                    var phoneTxt = this.api.useCss("#generalInfoForm div:nth-child(5) div:nth-child(2) div input");
                    phone.split("").forEach((c) => phoneTxt.sendKeys("#generalInfoForm div:nth-child(5) div:nth-child(2) div input", c));

                    //set fax number field
                    this.waitForElementVisible("#generalInfoForm div:nth-child(5) div:nth-child(3) div input", 10000);
                    var faxTxt = this.api.useCss("#generalInfoForm div:nth-child(5) div:nth-child(3) div input");
                    fax.split("").forEach((c) => faxTxt.sendKeys("#generalInfoForm div:nth-child(5) div:nth-child(3) div input", c));

                    //set Person in Charge
                    this.waitForElementVisible("#generalInfoForm div:nth-child(6) div:nth-child(1) div input", 10000)
                        .setValue("#generalInfoForm div:nth-child(6) div:nth-child(1) div input", inCharge)

                        //set years in hawaii field
                        .waitForElementVisible("#generalInfoForm div:nth-child(6) div:nth-child(2) div input", 10000)
                        .setValue("#generalInfoForm div:nth-child(6) div:nth-child(2) div input", yearsInHI)
                        //hawaii licenses
                        .waitForElementVisible("#generalInfoForm div:nth-child(7) div:nth-child(1) div input", 10000)
                        .setValue("#generalInfoForm div:nth-child(7) div:nth-child(1) div input", licHI)
                        //non-hawaii licenses
                        .waitForElementVisible("#generalInfoForm div:nth-child(7) div:nth-child(2) div input", 10000)
                        .setValue("#generalInfoForm div:nth-child(7) div:nth-child(2) div input", nonLicHI)
                
                        //Save form
                        .waitForElementVisible('#generalInfoForm button.btn.btn-default.btn-blue')
                        .customClick('#generalInfoForm button.btn.btn-default.btn-blue')
                        //confirm save
                        .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
                        .click("#MessageModal div div div.modal-body div.pmd-modal-action button")
                    return this.api;
                },
                checkTrasmittal: function () {
                    this.waitForElementVisible("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4", 10000)
                        .assert.visible("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4")
                        .assert.containsText("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4", "Transmittal Letter");
                    return this.api;
                },
                checkGoodStanding: function () {
                    this.waitForElementVisible("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-certificate h4")
                        .assert.visible("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-certificate h4")
                        .assert.containsText("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-certificate h4", "Certificate of Good Standing -or- Certificate of Vendor Compliance")
                    return this.api;
                },
                checkProofOfInsurance: function () {
                    this.waitForElementVisible("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div:nth-child(1) div:nth-child(2) div div label input", 10000)
                        .customClick("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div:nth-child(1) div:nth-child(2) div div label input")
                        .assert.visible("div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-insurance h4")
                        .assert.containsText("div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-insurance h4", "Proof of Insurance")
                        .customClick("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div:nth-child(1) div:nth-child(2) div div label input")
                    return this.api;
                },
                submitQualifications: function() {
                    this.waitForElementVisible("#SubmitQualifications.btn-blue");
                    this.api.pause(3000);
                    this.customClick("#SubmitQualifications.btn-blue")
                        .waitForElementVisible("#submission-dialog  input.btn.btn-default.btn-blue", 10000)
                        .customClick("#submission-dialog  input.btn.btn-default.btn-blue")
                        .waitForElementVisible("#SubmitterTitle:first-of-type + ul .parsley-custom-error-message")
                        .assert.containsText("#SubmitterTitle:first-of-type + ul .parsley-custom-error-message", "Job Title is required.")
                        .assert.containsText("#parsley-id-multiple-SubmitterAuthorized", "Authorization is required.")
                        .waitForElementVisible("#SubmitterTitle")
                        .setValue("#SubmitterTitle", "TITLE")
                        .waitForElementVisible("#SubmitterAuthorized")
                        .customClick("#SubmitterAuthorized")
                        .waitForElementVisible("#submission-dialog  input.btn.btn-default.btn-blue")
                        .customClick("#submission-dialog  input.btn.btn-default.btn-blue")
                        .waitForElementVisible('div.profile-dropdown-blocks-title h2')
                        .assert.containsText("div.profile-dropdown-blocks-title h2", "Qualifications submitted successfully.")
                },
                selectCompanyDropDown: function() {
                    this.waitForElementVisible("#ExpandCompanyDashboard")
                        .customClick("#ExpandCompanyDashboard")
                        .waitForElementVisible("#CompanyGeneralInfo div div div div div div ul li button.collapse-link")
                        .customClick("#CompanyGeneralInfo div div div div div div ul li button.collapse-link")
                },
                verifyDocumentFields: function() {
                    //assert correct company documents are shown
                    //Other: Documents are shown
                    this.waitForElementVisible("#CompanyInsuranceInfo > div > div > div.x_title > div > div.wrapper-icons > div > ul > li > button")
                    .customClick("#CompanyInsuranceInfo > div > div > div.x_title > div > div.wrapper-icons > div > ul > li > button")
                    .waitForElementVisible("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4")
                    .assert.visible("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4")
                    .assert.containsText("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4", "Transmittal Letter")
                    .waitForElementVisible("input[name='HasInsurance']", 80000)
                    .customClick("input[name='HasInsurance']")
                    .waitForElementVisible("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4")
                    .assert.visible("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4")
                    .assert.containsText("#CompanyInsuranceInfo div div div.x_content.dashboard-dropdown.x_content_border-top div form div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-insurance h4", "Proof of Insurance")
                    .click("input[name='HasInsurance']")
                    //Partnership: Documents are shown
                    .waitForElementVisible("#FirmTypeId option:nth-child(2)")
                    .click("#FirmTypeId option:nth-child(2)")
                    .assert.visible("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4")
                    .assert.containsText("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4", "Transmittal Letter")
                    .assert.visible("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-certificate h4")
                    .assert.containsText("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-certificate h4", "Certificate of Good Standing -or- Certificate of Vendor Compliance")
                    .assert.elementNotPresent(".doc-insurance h4")
                    .waitForElementVisible("input[name='HasInsurance']")
                    .customClick("input[name='HasInsurance']")
                    .assert.visible("div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-insurance h4")
                    .assert.containsText("div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-insurance h4", "Proof of Insurance")
                    .click("input[name='HasInsurance']")
                    //Corporation: Documents are shown
                    .waitForElementVisible("#FirmTypeId option:nth-child(3)")
                    .click("#FirmTypeId option:nth-child(3)")
                    .assert.visible("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4")
                    .assert.containsText("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4", "Transmittal Letter")
                    .assert.visible("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-certificate h4")
                    .assert.containsText("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-certificate h4", "Certificate of Good Standing -or- Certificate of Vendor Compliance")
                    .assert.elementNotPresent(".doc-insurance h4")
                    .waitForElementVisible("input[name='HasInsurance']")
                    .customClick("input[name='HasInsurance']")
                    .assert.visible("div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-insurance h4")
                    .assert.containsText("div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-insurance h4", "Proof of Insurance")
                    .click("input[name='HasInsurance']")
                    //Joint Venture: Documents are shown
                    .waitForElementVisible("#FirmTypeId option:nth-child(4)")
                    .click("#FirmTypeId option:nth-child(4)")
                    .assert.visible("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4")
                    .assert.containsText("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4", "Transmittal Letter")
                    .assert.visible("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-certificate h4")
                    .assert.containsText("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-certificate h4", "Certificate of Good Standing -or- Certificate of Vendor Compliance")
                    .assert.elementNotPresent(".doc-insurance h4")
                    .waitForElementVisible("input[name='HasInsurance']")
                    .customClick("input[name='HasInsurance']")
                    .assert.visible("div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-insurance h4")
                    .assert.containsText("div.additional-blocks-less-margin.discipline-block.negative-margin-bottom.doc-insurance h4", "Proof of Insurance")
                    .click("input[name='HasInsurance']")
                    //Individual: Documents are shown
                    .waitForElementVisible("#FirmTypeId option:nth-child(1)")
                    .click("#FirmTypeId option:nth-child(1)")
                    .assert.visible("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4")
                    .assert.containsText("div.company-documents.company-additional-blocks div.additional-blocks-less-margin.discipline-block.doc-transmittal h4", "Transmittal Letter")
                    .assert.elementNotPresent(".doc-insurance h4")
                },
                addCompanyInfo: function (address1, city, zipCode, phone, fax, estYear, yearsHI, hawaiiLicense, nonHawaiiLicense, file) {
                    //set address line 1
                    this.waitForElementVisible("#AddressLine1")
                    .setValue("#AddressLine1", address1)
                    //set city field
                    .waitForElementVisible("#City")
                    .setValue("#City", city)
                    .waitForElementVisible("#State")
                    .click("#State")
                    .click("#State option:first-child")
                    //set zip code field
                    .waitForElementVisible("#ZipCode")
                    .setValue("#ZipCode", zipCode)
                    //set phone number field
                    .waitForElementVisible("#PhoneNumber")
                    .setValue("#PhoneNumber", phone)
                    //set fax number field
                    .waitForElementVisible("#FaxNumber")
                    .setValue("#FaxNumber", fax)
                    //set established year field
                    .waitForElementVisible("#EstablishedYear")
                    .setValue("#EstablishedYear", estYear)
                    .waitForElementVisible("#EstablishedState")
                    .click("#EstablishedState")
                    .click("#EstablishedState option:first-child")
                    //set years in hawaii field
                    .waitForElementVisible("#YearsInHI")
                    .setValue("#YearsInHI", yearsHI)
                    //change company type
                    .waitForElementVisible("#FirmTypeId option:nth-child(1)")
                    .click("#FirmTypeId option:nth-child(1)")
                    //hawaii licenses
                    .waitForElementVisible("#HawaiiLicenses")
                    .setValue("#HawaiiLicenses", hawaiiLicense)
                    //non-hawaii licenses
                    .waitForElementVisible("#NonHawaiiLicenses")
                    .setValue("#NonHawaiiLicenses", nonHawaiiLicense)
                    //Transmittal Letter
                    .setValue('#transmittalLetter', require('path').resolve(__dirname + file))
                },
                updateInsuranceInfo: function (file) {
                    //Transmittal Letter
                    this
                    .setValue('#transmittalLetter', require('path').resolve(__dirname + file))
                    //Save form
                    .waitForElementVisible('#CompanyInsuranceInfo button.btn.btn-default.btn-blue[type=submit]')
                    .customClick('#CompanyInsuranceInfo button.btn.btn-default.btn-blue[type=submit]')
                    //confirm save
                    .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
                    .click("#MessageModal div div div.modal-body div.pmd-modal-action button")
                },
                saveAll: function(){
                    this.waitForElementVisible("#save-all-razor", 10000)
                        .customClick("#save-all-razor")
                        //confirm submit
                        .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 20000)
                        .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")
                        .waitForElementVisible('.save-all-spinner')
                        .waitForElementNotVisible('.save-all-spinner');
                    this.api.pause(5000);
                },
                }]
        };