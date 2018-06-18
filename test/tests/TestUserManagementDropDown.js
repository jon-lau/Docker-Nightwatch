/// <reference path="../pages/profile.js" />

/*
NAME:  TestUserManagementDropDown
DESCRIPTION:  These tests are intended to only test functionality of the
            User Management Drop Down. Testing the specific pages before and after testing
            of the Drop Down functionality should be moved to their specific test file.
NOTES:  -The reference above is intended to provide JS intellisense.
*/
module.exports = { // adapted from: https://git.io/vodU0
    'Empty Invite User Test': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn("user0@seed.net", "Password0");
        //click dropdown menu
        UserManagement.page.profile().clickUserDropDownMenu();
        //click user management
        UserManagement.page.profile().clickUserManagementLink();
        //click invite user
        UserManagement.page.profile().inviteUser('');
        //Check Validation
        browser.waitForElementVisible("body div div div.right_col div form div div:nth-child(2) ul")
            .assert.containsText("body div div div.right_col div form div div:nth-child(2) ul", "The email field is required.").end();
    },
    'Invite Invalid User Test': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn("user0@seed.net", "Password0");
        //click dropdown menu
        UserManagement.page.profile().clickUserDropDownMenu();
        //click user management
        UserManagement.page.profile().clickUserManagementLink();
        //invite user
        UserManagement.page.profile().inviteUser('XXX')
            .waitForElementVisible("body div div div.right_col div form div div:nth-child(2) ul")
            .assert.containsText("body div div div.right_col div form div div:nth-child(2) ul", "Please enter a valid email address.").end();
    },
    'Invite User Warning Test': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn("user0@seed.net", "Password0");
        UserManagement.page.profile().clickUserDropDownMenu();
        UserManagement.page.profile().clickUserManagementLink();
        //Invite User
        UserManagement.page.profile().inviteUser('xece@2ether.net')
            .assert.title('Invitation Cancelled - Consultant Portal') // This test requires setup so that it will run successfully, user1 must be in the same company as user0
            .end();
    },
    'Invite User Success Test': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn("user0@seed.net", "Password0");
        UserManagement.page.profile().clickUserDropDownMenu();
        UserManagement.page.profile().clickUserManagementLink();
        //Invite User Successfully
        UserManagement.page.profile().inviteUser('user@seed.net')
            .assert.title('Success - Consultant Portal')
            .end();
    },
    'Test Invalid Profile Edits': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn("user0@seed.net", "Password0");
        //click on user dropdown menu
        UserManagement.page.profile().clickUserDropDownMenu();
        //click profile settings
        UserManagement.page.profile().clickProfileSettingsLink();
        //clear phone number field
        browser.waitForElementVisible("input[name='PhoneNumber']")
            .clearValue("input[name='PhoneNumber']")
            //enter invalid phone number
            .setValue("input[name='PhoneNumber']", "000")
            //search for error message
            .assert.containsText("input[name='PhoneNumber']+ul li", "Please enter a phone number, including area code.")
            .end();
    },
    'Test Profile Fields Required': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn("user0@seed.net", "Password0");
        //click on user dropdown menu
        UserManagement.page.profile().clickUserDropDownMenu();
        //click profile settings
        UserManagement.page.profile().clickProfileSettingsLink();

        //clear first name
        browser.waitForElementVisible("input[name='FirstName']")
            .clearValue("input[name='FirstName']")
            //clear last name
            .waitForElementVisible("input[name='LastName']")
            .clearValue("input[name='LastName']")
            //submit form
            .waitForElementVisible("body div div div.right_col div div.profile-dropdown-blocks-buttons input")
            .customClick("body div div div.right_col div div.profile-dropdown-blocks-buttons input")
            //search for error messages
            .assert.containsText("input[name='FirstName']+ul li", "The first name field is required.")
            .assert.containsText("input[name='LastName']+ul li", "The last name field is required.")
            .end();
    },
    'Delete Account Test': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn("user4@seed.net", "Password4");
        //click on user dropdown menu
        UserManagement.page.profile().clickUserDropDownMenu();
        //click delete account
        UserManagement.page.profile().clickDeleteAccountLink();
        //check that the delete button is there
        browser.waitForElementVisible("form input[type=submit][value='Delete']")
            .assert.elementPresent("form input[type=submit][value='Delete']")
            .end();
    },
    'Create Admin User Invalid Fields Test': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn();
        UserManagement.page.profile().clickUserDropDownMenu();
        UserManagement.page.profile().clickUserManagementLink();
        UserManagement.page.profile().createAdminUserEmpty()

        //the fields are required
        browser.assert.containsText("#parsley-id-5", "The email field is required.")
            .assert.containsText("#parsley-id-7", "The first name field is required.")
            .assert.containsText("#parsley-id-9", "The last name field is required.")
            .assert.containsText("#parsley-id-11", "The password field is required.")
            .assert.containsText("#parsley-id-13", "The confirm password field is required.")
            .setValue("input[name='Email']", "xxx")
            .waitForElementVisible("form input[name='Password']")
            .setValue("input[name='Password']", "123456")
            .waitForElementVisible("form input[name='ConfirmPassword']")
            .setValue("input[name='ConfirmPassword']", "654321")
            .customClick("input[type=checkbox][value='Admin']")
            .waitForElementVisible("input[type=submit][value='Create']")
            .customClick("input[type=submit][value='Create']")
            //assertions
            .assert.containsText("#parsley-id-5", "Please enter a valid email address.")
            .assert.containsText("#parsley-id-13", "Your password does not match.")
            .end();
    },
    'Create Admin User Test': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn();
        UserManagement.page.profile().clickUserDropDownMenu();
        UserManagement.page.profile().clickUserManagementLink();
        UserManagement.page.profile().createAdminUser("zzzzz@seed.net", "FirstName", "LastName", "Password", "Password", true);

        UserManagement.page.profile().waitForElementVisible("div.page-with-table-button a") //create admin user
            .waitForElementVisible("div div div.right_col div table tbody tr:last-child td.td-padded-left")
            .assert.containsText("div div div.right_col div table tbody tr:last-child td.td-padded-left", "zzzzz@seed.net")
            .customClick("body div div div.right_col div table tbody tr:last-child td.td-padded-right div a.red-text") //delete
            .waitForElementVisible("body div div div.right_col div div.delete-buttons form input.btn.btn-default.btn-white") // delete button
            .customClick("body div div div.right_col div div.delete-buttons form input.btn.btn-default.btn-white")
            .waitForElementVisible("div.page-with-table-button a"); //create admin user
        browser.expect.element('div div div.right_col div table tbody tr:last-child td.td-padded-left').text.to.not.equal('zzzzz@seed.net');
        browser.end();
    },
    'Change User role test': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn();
        UserManagement.page.profile().clickUserDropDownMenu();
        UserManagement.page.profile().clickUserManagementLink();
        //change role
        browser.pause(2000);
        UserManagement.page.profile().changeRoleLink();
        UserManagement.page.profile().clickStaffBox();
        UserManagement.page.profile().clickUserBox();
        UserManagement.page.profile().clickSubmitButton(); //save
        //change role back
        UserManagement.page.profile().changeRoleLink();
        //assert the change was saved
        UserManagement.page.profile().clickUserBox();
        UserManagement.page.profile().clickStaffBox();
        UserManagement.page.profile().clickSubmitButton(); //save
        UserManagement.page.profile().changeRoleLink();
        browser.end();
    },
    'Change Profile settings Test': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn("user2@seed.net", "Password2");
        UserManagement.page.profile().clickUserDropDownMenu();
        UserManagement.page.profile().clickProfileSettingsLink();

        //change settings
        UserManagement.page.profile().updateProfile("first name", "last name", "");

        //change settings back
        UserManagement.page.profile().clickUserDropDownMenu();
        UserManagement.page.profile().clickProfileSettingsLink();

        //assert name change
        browser.assert.valueContains("input[name='FirstName']", "First name") //auto capitalization
            .assert.valueContains("input[name='LastName']", "Last name"); //auto capitalization
        UserManagement.page.profile().updateProfile('User', 'Seed', '');
        browser.end();
    },
    'Test Change Password Required': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn("user0@seed.net", "Password0");
        UserManagement.page.profile().clickUserDropDownMenu();
        UserManagement.page.profile().clickChangePasswordLink();

        //click change password
        browser.customClick("input[type=submit][value='Change Password']");
        browser.assert.containsText(".main_container .form-group:nth-child(1) .parsley-errors-list", "The current password field is required.")
            .assert.containsText(".main_container .form-group:nth-child(2) .parsley-errors-list", "The new password field is required.")
            .assert.containsText(".main_container .form-group:nth-child(3) .parsley-errors-list", "The confirm new password field is required.");
        browser.end();
    },
    'Valid Confirm Change Password Test': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn();
        UserManagement.page.profile().clickUserDropDownMenu();
        UserManagement.page.profile().clickChangePasswordLink();

        //input old password field
        UserManagement.page.profile().waitForElementVisible("form input[name='OldPassword']")
            .customClick("form input[name='OldPassword']")
            .waitForElementVisible("input[name='OldPassword']")
            .setValue("input[name='OldPassword']", "password")
            //input new password field
            .waitForElementVisible("form input[name='NewPassword']")
            .customClick("form input[name='NewPassword']")
            .waitForElementVisible("input[name='NewPassword']")
            .setValue("input[name='NewPassword']", "123456")
            //input confirm new password field
            .waitForElementVisible("form input[name='ConfirmPassword']")
            .customClick("form input[name='ConfirmPassword']")
            .waitForElementVisible("input[name='ConfirmPassword']")
            .setValue("input[name='ConfirmPassword']", "654321")
            //click change password button
            .waitForElementVisible("input[type=submit][value='Change Password']")
            .customClick("input[type=submit][value='Change Password']")
            .assert.containsText("#parsley-id-9", "Your password does not match.");
        browser.end();
    },
    'Change Password Test': function (browser) {
        //login
        var UserManagement = browser.page.profile().navigate().signIn("user4@seed.net", "Password4");
        UserManagement.page.profile().clickUserDropDownMenu();
        UserManagement.page.profile().clickChangePasswordLink();

        //input old password field
        UserManagement.page.profile().UpdatePassword('Password4', '123456', '123456');
        UserManagement.page.profile().signOut("4");

        //login
        UserManagement = browser.page.profile().navigate().signIn("user4@seed.net", "123456");
        UserManagement.page.profile().clickUserDropDownMenu();
        UserManagement.page.profile().clickChangePasswordLink();

        //input old password field
        UserManagement.page.profile().UpdatePassword('Password4', '', '');
        //assert incorrect current password
        browser.assert.containsText("#parsley-id-5", "Incorrect password.");
        //input valid current password
        UserManagement.page.profile().UpdatePassword('123456', 'Password4', 'Password4');
        browser.end();
    },

};
