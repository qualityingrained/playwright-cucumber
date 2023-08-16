class LoginPage {
	async navigateToLoginPage() {
		await page.goto("https://www.saucedemo.com/");
	}

	async submitLoginForm(username, password) {
		await page.locator("#user-name").type(username);
		await page.locator("#password").type(password);
		await page.locator("#login-button").click();
	}

	async assertErrorMessage() {
		await page.locator('[data-test="error"]').isVisible();
	}
}

module.exports = { LoginPage };
