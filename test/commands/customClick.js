//file: customClick.js
exports.command = function (selector, callback) {
    this.execute(function (selector) {
        //trigger focus on element
        document.querySelector(selector).focus();
        //click element
        document.querySelector(selector).click();
	}, [selector]);
	
	if (typeof callback === "function") {
		callback.call(this);
	}
	return this;
};
