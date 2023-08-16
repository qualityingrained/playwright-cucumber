class MainMenu {
	async openMenu() {
		await page.locator("button#react-burger-menu-btn").click();
	}

	async logout() {
		await page.locator("a#logout_sidebar_link").click();
	}
}

module.exports = { MainMenu };
