const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const crashkenUtil = require('../../util/crashkenUtil');

Given('I logIn', function() {
	return this.driver.resolve(crashkenUtil.report.start('Fazer Login'))
	.elementById('banco.devicelab.com.br.banco:id/main_button_login').click()
	.elementById('banco.devicelab.com.br.banco:id/login_email').sendKeys('123')
	.elementById('banco.devicelab.com.br.banco:id/login_password').sendKeys('123')
	.elementById('banco.devicelab.com.br.banco:id/login_button').click()
	.then(crashkenUtil.report.end);

});

Then('open menu and click on {string}', function(menuItem){
	return this.driver.resolve(crashkenUtil.report.start(`Open Menu and click on ${menuItem}`))
	.elementByAndroidUIAutomator(`new UiSelector().descriptionContains("Open navigation drawer")`).click()
	.elementByAndroidUIAutomator(`new UiSelector().textMatches("(?i)${menuItem}")`).click()
	.then(crashkenUtil.report.end);
});

Then('click on button text {string}', function(text){
	return this.driver.resolve(crashkenUtil.report.start(`Click on button text ${text}`))
	.elementByAndroidUIAutomator(`new UiSelector().textMatches("(?i)${text}")`).click()
	.then(crashkenUtil.report.end);
});

Then('press {string}', function(button){

	switch(button){
		case "Back":
		 return this.driver.pressKeycode(4);
		break;
		case "Home":
			return this.driver.pressKeycode(3);
		break;
	}
});
