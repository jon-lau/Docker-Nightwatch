module.exports = {
    url: function () {
        return this.api.launchUrl;
    },
    elements: {
        fileTypeLink: '#admin-sidebar-menu div.menu_section:last-child a',
        createNewBtn: 'div.right_col div div.page-with-table-button a',
        nameInput: "form input[id='Name']",
        createBtn: "input[type=submit][value='Create']",
        saveBtn: "input[type=submit][value='Save']",
        firstFileTypeItem: "tr:nth-child(1) td:last-child a:last-child",
        firstFileTypeEditLink: 'tr:nth-child(1) td:last-child a:nth-child(1)',
        deleteBtn: "form input[type=submit][value='Delete']",
    },
    commands: [{
        signIn: function (user = 'admin@revacomm.com', password = 'password') {
            this.api.page.login().navigate().signIn(user, password);
            return this.api;
        },
        signOut: function () {
            //click user dropdown menu
            this.waitForElementVisible("div.top_nav div.nav_menu nav ul")
                .assert.elementPresent("div.top_nav div.nav_menu nav ul")
                .click("div.top_nav div.nav_menu nav ul")
                //click sign out 
                .waitForElementVisible("body div div div.top_nav div nav ul li ul li:nth-child(4) a")
                .customClick("body div div div.top_nav div nav ul li ul li:nth-child(4) a")
                //wait for page to load
                .waitForElementVisible(".row.homepage-content")
                .customClick(".row.homepage-content");
            return this.api;
        },
        clickFileTypeLink: function () {
            this.waitForElementVisible('@fileTypeLink')
                .customClick('@fileTypeLink');
            return this.api;
        },
        clickCreateNewButton: function () {
            this.waitForElementVisible('@createNewBtn')
                .customClick('@createNewBtn');
            return this.api;
        },
        inputFileTypeName: function (name) {
            this.waitForElementVisible('@nameInput')
                .setValue('@nameInput', name);
            return this.api;
        },
        clickCreateButton: function () {
            this.waitForElementVisible('@createBtn')
                .customClick('@createBtn');
            return this.api;
        },
        deletefirstFileType: function () {
            this.waitForElementVisible('@firstFileTypeItem')
                .customClick('@firstFileTypeItem')
                .waitForElementVisible("div.right_col div a") //back to list
                .waitForElementVisible("@deleteBtn")
                .customClick("@deleteBtn");
            return this.api;
        },
        createNewFileType: function (name) {
            this.waitForElementVisible('@createNewBtn')
                .customClick('@createNewBtn')
                .waitForElementVisible('@nameInput')
                .setValue('@nameInput', name)
                .waitForElementVisible('@createBtn')
                .customClick('@createBtn');
            return this.api;
        },
        editFileType: function (name) {
            this.customClick('@firstFileTypeEditLink') //edit button
                .waitForElementVisible("div.right_col div a")
                .waitForElementVisible("@nameInput")
                .clearValue("@nameInput")
                .setValue("@nameInput", name)
                .waitForElementVisible("@saveBtn")
                .customClick("@saveBtn")
            return this.api;
        }

    }]
};