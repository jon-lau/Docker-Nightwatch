module.exports = {
    url: function() {
        return this.api.launchUrl;
    },
    elements: {
    },
    commands: [{
        selectDisciplineDropDown: function () {
            this.waitForElementVisible("#expandDisciplines", 20000)
                .customClick('#expandDisciplines');
            this.waitForElementPresent("#sidebar-menu a.side-menu-create[data-id='DisciplinesRow']", 10000)
                .customClick("#sidebar-menu a.side-menu-create[data-id='DisciplinesRow']");
            this.api.pause(3000);
            return this.api;
        }, 
        addDiscipline: function(disciplineNum, save = true) {

            this.waitForElementVisible("#null_Form div div.row.row-margin-bottom div div select option:nth-child(" + disciplineNum + ")", 10000)
                .click("#null_Form div div.row.row-margin-bottom div div select option:nth-child(" + disciplineNum + ")")
                //input file
                .waitForElementVisible("#null_Form div div:nth-child(3) div.col-xs-12.col-sm-3 div div button", 10000)
            this.waitForElementVisible("#null_Form div div:nth-child(3) div.col-xs-12.col-sm-3 div div button")
                .customClick("#null_Form div div:nth-child(3) div.col-xs-12.col-sm-3 div div button")
                .setValue("input#null_File_0.form-control", require("path").resolve(__dirname + "/../AttachmentFiles/TestFile.pdf"))
            //assert file upload
            this.waitForElementVisible("#null_Form div div.additional-file-section div div.col-xs-10 label")
            this.assert.containsText("#null_Form div div.additional-file-section div div.col-xs-10 label", "TestFile.pdf")
            //save
            if(save){
                this.waitForElementVisible("#null_Form button[type=submit]", 10000)
                    .customClick("#null_Form button[type=submit]")
                    //confirm submit
                    .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button", 20000)
                    .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button");
            }
            return this.api;
        },
            deleteDiscipline: function() {
                this.waitForElementVisible("csp-discipline div div div.x_title div div.wrapper-icons div ul li:nth-child(1) button")
                    .customClick("csp-discipline div div div.x_title div div.wrapper-icons div ul li:nth-child(1) button")
                    .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action div button.btn.btn-default.btn-blue.confirm-delete-item")
                    .customClick("#MessageModal div div div.modal-body div.pmd-modal-action div button.btn.btn-default.btn-blue.confirm-delete-item")
                    .waitForElementVisible("#MessageModal div div div.modal-body div.pmd-modal-action button")
                    .customClick("#MessageModal div div div.modal-body div.pmd-modal-action button")
                return this.api;
            },
            }]
};