module.exports = {
    url: function() {
        return this.api.launchUrl;
    },
    elements: {
    },
    commands: [{
        selectProjectDropDown: function () {
            this.waitForElementVisible("#expandProjects", 20000)
                .customClick('#expandProjects');
            this.waitForElementPresent("#sidebar-menu a.side-menu-create[data-id='ProjectsRow']", 10000)
                .customClick("#sidebar-menu a.side-menu-create[data-id='ProjectsRow']");

            return this.api;
        }, 
        addProject: function (year, name, add1, add2, city, zip, description, designDur, designCompPercent, constCompPercent,
            estConstCost, leadName, leadEmail, ownName, ownAdd1, ownAdd2, ownCity, ownZip, ownPhone, ownFax, save = true) {

                //year
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_Year']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_Year']", year)
                //name
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_Name']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_Name']", name)
                //add1
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_AddressLine1']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_AddressLine1']", add1)

                //add2
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_AddressLine2']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_AddressLine2']", add2)
                //city
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_City']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_City']", city)
                //zip
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_ZipCode']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_ZipCode']", zip)

                //description
                this.waitForElementVisible("csp-project:last-child textarea[ng-reflect-name='null_Description']")
                    .setValue("csp-project:last-child textarea[ng-reflect-name='null_Description']", description)

                //designDur
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_DesignDuration']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_DesignDuration']", designDur)
                //designCompPercent
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_DesignCompleted']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_DesignCompleted']", designCompPercent)
                //constCompPercent
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_ConstCompleted']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_ConstCompleted']", constCompPercent)
                //estConstCost
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_Cost']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_Cost']", estConstCost)

                //leadName
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_LeadDesignerName']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_LeadDesignerName']", leadName)
                //leadEmail
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_LeadDesignerEmail']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_LeadDesignerEmail']", leadEmail)

                //ownName
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.Name']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.Name']", ownName)
                //ownAdd1
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.AddressLine1']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.AddressLine1']", ownAdd1)
                //ownAdd2
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.AddressLine2']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.AddressLine2']", ownAdd2)
                //ownCity
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.City']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.City']", ownCity)

                //ownZip
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.ZipCode']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.ZipCode']", ownZip)
                //ownPhone
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.PhoneNumber']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.PhoneNumber']", ownPhone)
                //ownFax
                this.waitForElementVisible("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.FaxNumber']")
                    .setValue("csp-project:last-child input[ng-reflect-name='null_ProjectOwner.FaxNumber']", ownFax)
            
                //save
                if(save){
                    this.waitForElementVisible("#null_Form button.btn-blue[type=submit]", 10000)
                    .customClick("#null_Form button.btn-blue[type=submit]")
                    //confirm submit
                    .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 20000)
                    .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button");
                }

                return this.api;
            },
            deleteProject: function() {
                this.customClick("csp-project:last-child div.row.project-row div div div.x_title div div.wrapper-icons div ul li:nth-child(1) button")
                    .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action div button.btn.btn-default.btn-blue.confirm-delete-item")
                              .customClick("#MessageModal div div div.modal-body div.pmd-modal-action div button.btn.btn-default.btn-blue.confirm-delete-item")
                    .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button")
                              .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")
                return this.api;
            },
            }]
};