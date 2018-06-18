module.exports = {
    url: function () {
        return this.api.launchUrl;
    },
    elements: {},
    commands: [{
        openBranchDropDown: function () {
            this.waitForElementVisible("#ExpandBranchesDashboard", 10000)
                .customClick("#ExpandBranchesDashboard")
            return this.api;
        },
        addBranch: function () {
            this.waitForElementPresent("#sidebar-menu a.side-menu-create[data-id='BranchesRow']")
                .customClick("#sidebar-menu a.side-menu-create[data-id='BranchesRow']");
            return this.api;
        },
        deleteBranch: function () {
            this.waitForElementVisible(".branch-row:last-of-type .wrapper-icons li:first-of-type button");
            this.api.pause(2000);
            //click delete 
            this.customClick("csp-branch:last-child div div div.x_title div div.wrapper-icons div ul li:nth-child(1) button");
            //confirm delete
            this.waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action div button.btn.btn-default.btn-blue.confirm-delete-item")
                .customClick("#MessageModal div div div.modal-body div.pmd-modal-action div button.btn.btn-default.btn-blue.confirm-delete-item");
            this.api.pause(2000);
            this.waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button")
                .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button");
            this.api.pause(2000);
            return this.api;
        },
        setBranchName: function (branchName) {
            this.waitForElementVisible("csp-branch div div div div div div:nth-child(1) div:nth-child(1) div input")
                .clearValue("csp-branch div div div div div div:nth-child(1) div:nth-child(1) div input")
                .setValue("csp-branch div div div div div div:nth-child(1) div:nth-child(1) div input", branchName);
            return this.api;
        },
        setAddress: function (address) {
            this.waitForElementVisible("csp-branch div div div div div  div:nth-child(1) div:nth-child(2) div input")
                .customClick("csp-branch div div div div div  div:nth-child(1) div:nth-child(2) div input")
                .setValue("csp-branch div div div div div  div:nth-child(1) div:nth-child(2) div input", address)
            return this.api;
        },
        setCity: function (city) {
            this.waitForElementVisible("csp-branch div div div div div  div:nth-child(1) div:nth-child(4) div input")
                .customClick("csp-branch div div div div div  div:nth-child(1) div:nth-child(4) div input")
                .setValue("csp-branch div div div div div  div:nth-child(1) div:nth-child(4) div input", city)
            return this.api;
        },
        setZipcode: function (zipcode) {
            this.waitForElementVisible("csp-branch:nth-child(2) div div div div div div div:nth-child(2) div:nth-child(2) div input")
                .customClick("csp-branch:nth-child(2) div div div div div div div:nth-child(2) div:nth-child(2) div input")
                .setValue("csp-branch:nth-child(2)  div div div div div div div:nth-child(2) div:nth-child(2) div input", zipcode)
            return this.api;
        },
        setPhoneNumber: function (phone) {
            this.waitForElementVisible("csp-branch:nth-child(2) div div div div div  div:nth-child(2) div:nth-child(3) div input")
                .customClick("csp-branch:nth-child(2) div div div div div  div:nth-child(2) div:nth-child(3) div input")
                .setValue("csp-branch:nth-child(2) div div div div div  div:nth-child(2) div:nth-child(3) div input", phone)
            return this.api;
        },
        setFaxNumber: function (fax) {
            this.waitForElementVisible("csp-branch:nth-child(2) div div div div div  div:nth-child(2) div:nth-child(4) div input")
                .customClick("csp-branch:nth-child(2) div div div div div  div:nth-child(2) div:nth-child(4) div input")
                .setValue("csp-branch:nth-child(2) div div div div div  div:nth-child(2) div:nth-child(4) div input", fax)
            return this.api;
        },
        setArchitects: function (architects) {
            this.waitForElementVisible("csp-branch:last-child form div:nth-child(3) div div:nth-child(1) div input")
                .customClick("csp-branch:last-child form div:nth-child(3) div div:nth-child(1) div input")
                .setValue("csp-branch:last-child form div:nth-child(3) div div:nth-child(1) div input", architects)
            return this.api;
        },
        setMechanicalEngineers: function (mEngine) {
            this.waitForElementVisible("csp-branch:last-child form div:nth-child(3) div div:nth-child(2) div input")
                .customClick("csp-branch:last-child form div:nth-child(3) div div:nth-child(2) div input")
                .setValue("csp-branch:last-child form div:nth-child(3) div div:nth-child(2) div input", mEngine)
            return this.api;
        },
        setElectricalEngineers: function (eEngine) {
            this.waitForElementVisible("csp-branch:last-child form div:nth-child(3) div div:nth-child(3) div input")
                .customClick("csp-branch:last-child form div:nth-child(3) div div:nth-child(3) div input")
                .setValue("csp-branch:last-child form div:nth-child(3) div div:nth-child(3) div input", eEngine)
            return this.api;
        },
        setCivilEngineers: function (cEngine) {
            this.waitForElementVisible("csp-branch:last-child form div:nth-child(3) div div:nth-child(4) div input")
                .customClick("csp-branch:last-child form div:nth-child(3) div div:nth-child(4) div input")
                .setValue("csp-branch:last-child form div:nth-child(3) div div:nth-child(4) div input", cEngine)
            return this.api;
        },
        setOtherEngineers: function (oEngine) {
            this.waitForElementVisible("csp-branch:last-child form div:nth-child(3) div div:nth-child(5) div input")
                .customClick("csp-branch:last-child form div:nth-child(3) div div:nth-child(5) div input")
                .setValue("csp-branch:last-child form div:nth-child(3) div div:nth-child(5) div input", oEngine)
            return this.api;
        },
        setDraftsmen: function (draftsmen) {
            this.waitForElementVisible("csp-branch:last-child form div:nth-child(4) div div:nth-child(1) div input")
                .customClick("csp-branch:last-child form div:nth-child(4) div div:nth-child(1) div input")
                .setValue("csp-branch:last-child form div:nth-child(4) div div:nth-child(1) div input", draftsmen)
            return this.api;
        },
        setSpecificationWriters: function (specWriters) {
            this.waitForElementVisible("csp-branch:last-child form div:nth-child(4) div div:nth-child(2) div input")
                .customClick("csp-branch:last-child form div:nth-child(4) div div:nth-child(2) div input")
                .setValue("csp-branch:last-child form div:nth-child(4) div div:nth-child(2) div input", specWriters)
            return this.api;
        },
        setEstimators: function (estimators) {
            this.waitForElementVisible("csp-branch:last-child form div:nth-child(4) div div:nth-child(3) div input")
                .customClick("csp-branch:last-child form div:nth-child(4) div div:nth-child(3) div input")
                .setValue("csp-branch:last-child form div:nth-child(4) div div:nth-child(3) div input", estimators)
            return this.api;
        },
        setInspectors: function (inspectors) {
            this.waitForElementVisible("csp-branch:last-child form div:nth-child(4) div div:nth-child(4) div input")
                .customClick("csp-branch:last-child form div:nth-child(4) div div:nth-child(4) div input")
                .setValue("csp-branch:last-child form div:nth-child(4) div div:nth-child(4) div input", inspectors)
            return this.api;
        },
        setSurveyors: function (surveyors) {
            this.waitForElementVisible("csp-branch:last-child form div:nth-child(4) div div:nth-child(5) div input")
                .customClick("csp-branch:last-child form div:nth-child(4) div div:nth-child(5) div input")
                .setValue("csp-branch:last-child form div:nth-child(4) div div:nth-child(5) div input", surveyors)
            return this.api;
        },
        setEmployeeBalance: function (employeeBalance) {
            this.waitForElementVisible("csp-branch:last-child form div:nth-child(4) div div:nth-child(6) div input")
                .customClick("csp-branch:last-child form div:nth-child(4) div div:nth-child(6) div input")
                .setValue("csp-branch:last-child form div:nth-child(4) div div:nth-child(6) div input", employeeBalance)
            return this.api;
        },
        submitFormButton: function () {

            //submit form
            this.waitForElementVisible("csp-branch:last-child form button.btn.btn-default.btn-blue")
                //click submit button
                .customClick("csp-branch:last-child form button.btn.btn-default.btn-blue")
                //wait for confirmation to show
                .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 10000)
                .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button");
            return this.api;
        },
        deleteCompany: function () {
            this.api.page.company().deleteCompany();
            return this.api;
        },
        setBranchFields: function (name, address, city, zip, phone, fax, architects, mEng, eEng, cEng, oEng, draftsmen, specWriters, estimators, inspectors, surveyors, empBalance) {
            this.setBranchName(name);
            this.setAddress(address);
            this.setCity(city);
            this.setZipcode(zip);
            this.setPhoneNumber(phone);
            this.setFaxNumber(fax);
            this.setArchitects(architects);
            this.setMechanicalEngineers(mEng);
            this.setElectricalEngineers(eEng);
            this.setCivilEngineers(cEng);
            this.setOtherEngineers(oEng);
            this.setDraftsmen(draftsmen);
            this.setSpecificationWriters(specWriters);
            this.setEstimators(estimators);
            this.setInspectors(inspectors);
            this.setSurveyors(surveyors);
            this.setEmployeeBalance(empBalance);
            return this.api;
        },
    }]
};