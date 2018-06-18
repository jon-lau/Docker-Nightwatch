
module.exports = { // adapted from: https://git.io/vodU0
    'Login 20 min Timeout Test': function (browser) {

        //login
        var loginPage = browser.page.login().navigate().signIn("admin@revacomm.com", "password");
        loginPage.assert.title('- Consultant Portal')
            //wait 20 minutes
            .pause(1200000)
            //assert you have been logged out
            .waitForElementVisible("#error-login strong", 300000)
            .assert.containsText("#error-login strong", "Your session expired. Login to pick up where you left off.")
            .end();
    }
};
