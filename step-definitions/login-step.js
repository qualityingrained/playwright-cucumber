const { Given, When, Then, defineStep } = require("@cucumber/cucumber");
const { LoginPage } = require("../page-objects/login-page");

const loginPage = new LoginPage();

Given("I visit a login page", async function () {
	// Write code here that turns the phrase above into concrete actions
	await loginPage.navigateToLoginPage();
});

When("I log in", async function () {
	await loginPage.navigateToLoginPage();
	await loginPage.submitLoginForm("standard_user", "secret_sauce");
});

When("I fill the login form with valid credentials", async function () {
	await loginPage.submitLoginForm("standard_user", "secret_sauce");
});

When("I fill the login form with a locked-out user", async function () {
	await loginPage.submitLoginForm("locked_out_user", "secret_sauce");
});

When(
	/^I fill the login form with "([^"]*)" and "([^"]*)"$/,
	async function (username, password) {
		await loginPage.submitLoginForm(username, password);
	},
);

Then("I should see the home page", async function () {
	await page.waitForSelector(".inventory_container");
});

Then("I should see an invalid credentials error message", async function () {
	await loginPage.assertErrorMessage();
});

Then("I should see a locked-out error message", async function () {
	await loginPage.assertErrorMessage();
});
