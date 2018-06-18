module.exports = {
    url: function() {
        return this.api.launchUrl;
    },
    elements: {
        login: "nav .col-xs-1 button",
        userField: "form input[name='Email']",
        passwordField: "form input[name='Password']",
        submit: "form input[type=submit][value='Sign In']",
        userDropDown: "div.top_nav div.nav_menu nav .dropdown-toggle",
        inviteUserLink: "body div div div.right_col div div.page-with-table-button a",
        inviteUserBtn: "body div div div.right_col div div.profile-dropdown-blocks-buttons input",
        createAdminLink: "div.page-with-table-button a",
        createAdminBtn: "input[type=submit][value='Create']",
        deleteAccountlink: "div.top_nav div nav ul li ul li:nth-child(3) a",
        profileSettingLink: "div.top_nav div nav ul li ul li:nth-child(1) a",
        passwordChangeLink: "div.top_nav div nav ul li ul li:nth-child(2) a",
        userManagementLink: "div.top_nav div nav ul li ul li:nth-child(4) a",
        mail: "input[name='Email']",
        firstName: "#FirstName",
        lastName: "#LastName",
        password: "form input[name='Password']",
        confirmPassword: "form input[name='ConfirmPassword']",
        isAdmin: "input[type=checkbox][value='Admin']",
        changeRoleLink: "div.right_col div table tbody tr:last-child td.td-padded-right div a:nth-child(1)",
        staffCheckBox: "form input[type=checkbox][value='Staff']",
        userCheckBox: "form input[type=checkbox][value='User']",
    },
    commands: [{
        signIn: function (user = 'admin@revacomm.com', password = 'password') {
            this.api.page.login().navigate().signIn(user, password);
            return this.api;
        },
        signOut: function (index = "6") {
            this.api.page.login().signOut(index);
            return this.api;
        },
        clickUserDropDownMenu: function() {
            this.waitForElementVisible("@userDropDown")
                .assert.elementPresent("@userDropDown")
                .customClick("@userDropDown");
            return this.api;
        },
        clickUserManagementLink: function() {
            this.waitForElementVisible("@userManagementLink")
                .customClick("@userManagementLink");
            return this.api;
        },
        clickProfileSettingsLink: function() {
            this.waitForElementVisible("@profileSettingLink")
                .customClick("@profileSettingLink")
            return this.api;
        },
        clickChangePasswordLink: function() {
            this.waitForElementVisible("@passwordChangeLink")
                .customClick("@passwordChangeLink")
            return this.api;
        },
        inviteUser: function(user) {
            //click invite user
            this.waitForElementVisible("@inviteUserLink")
                .customClick("@inviteUserLink")
                .waitForElementVisible("@mail")
                .setValue("@mail", user)
                //click invite button
                .waitForElementVisible("@inviteUserBtn")
                .customClick("@inviteUserBtn");
            //Add User EMAIL
            return this.api;
        },
        createAdminUser: function(email, fName, lName, pass, confirmPass, isAdmin = false) {
            //click invite user
            this.waitForElementVisible("@createAdminLink")
                .customClick("@createAdminLink")
                .waitForElementVisible("@mail")
                //Fill out user form
                .waitForElementVisible("@mail")
                .setValue("@mail", email)
                .waitForElementVisible("@firstName")
                .setValue("@firstName", fName)
                .waitForElementVisible("@lastName")
                .setValue("@lastName", lName)
                .waitForElementVisible("@password")
                .setValue("@password", pass)
                .waitForElementVisible("@confirmPassword")
                .setValue("@confirmPassword", confirmPass);
            if (isAdmin) {
                this.customClick("@isAdmin");
            }
            this.waitForElementVisible("@createAdminBtn")
                .customClick("@createAdminBtn")
            return this.api;
        },
        createAdminUserEmpty: function() {
            //click invite user
            this.waitForElementVisible("@createAdminLink")
                .customClick("@createAdminLink")
                .waitForElementVisible("@mail")
                //click invite button
                .waitForElementVisible("@createAdminBtn")
                .customClick("@createAdminBtn");
            //Add User EMAIL
            return this.api;
        },
        clickDeleteAccountLink: function() {
            this.waitForElementVisible("@deleteAccountlink")
                .customClick("@deleteAccountlink");
            return this.api;
        },
        changeRoleLink: function() {
            this.waitForElementVisible("@changeRoleLink") //change role
                .customClick("@changeRoleLink")
            return this.api;
        },
        clickUserBox: function() {
            this.waitForElementVisible("@userCheckBox")
                .customClick("@userCheckBox")
            return this.api;
        },
        clickStaffBox: function() {
            this.waitForElementVisible("@staffCheckBox")
                .customClick("@staffCheckBox")
            return this.api;
        },
        updateProfile: function(fName, lName, phone) {
            this.waitForElementVisible("form input[name='FirstName']")
                .clearValue("form input[name='FirstName']")
                .setValue("input[name='FirstName']", fName)
                .waitForElementVisible("form input[name='LastName']")
                .clearValue("form input[name='LastName']")
                .setValue("input[name='LastName']", lName)
                .waitForElementVisible("form input[name='PhoneNumber']")
                .clearValue("form input[name='PhoneNumber']")
                .setValue("input[name='PhoneNumber']", phone)
                .waitForElementVisible("input[type=submit][value='Update']")
                .customClick("input[type=submit][value='Update']")
            return this.api;
        },
        clickSubmitButton: function() {
            this.waitForElementVisible("#SubmitUserRoles")
                .customClick("#SubmitUserRoles")
            return this.api;
        },
        UpdatePassword: function(currentPass, pass, confirmPass) {
            this.waitForElementVisible("form input[name='OldPassword']")
                .clearValue("form input[name='OldPassword']")
                .setValue("input[name='OldPassword']", currentPass)
                .waitForElementVisible("form input[name='NewPassword']")
                .clearValue("form input[name='NewPassword']")
                .setValue("input[name='NewPassword']", pass)
                .waitForElementVisible("form input[name='ConfirmPassword']")
                .clearValue("form input[name='ConfirmPassword']")
                .setValue("input[name='ConfirmPassword']", confirmPass);
            this.waitForElementVisible("input[type=submit][value='Change Password']")
                .customClick("input[type=submit][value='Change Password']")
            return this.api;
        },
        waitForLoad: function () {
            this.waitForElementVisible('.save-all-spinner')
                .waitForElementNotVisible('.save-all-spinner');
        }
    }]
};