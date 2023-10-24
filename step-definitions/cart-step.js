const { Given, When, Then } = require("@cucumber/cucumber");
const { CartPage } = require("../page-objects/cart-page");
const { LoginPage } = require("../page-objects/login-page");
const { InventoryPage } = require("../page-objects/inventory-page");
const { MainMenu } = require("../page-objects/shared-page-objects/mainmenu");

const cartPage = new CartPage();
const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();
const mainMenu = new MainMenu();

Given("I log out with {string} in my cart", async function (productName) {
	await loginPage.navigateToLoginPage();
	await loginPage.submitLoginForm("standard_user", "secret_sauce");
	await inventoryPage.addProductToCart(productName, 0);
	await mainMenu.openMenu();
	await mainMenu.logout();
});

Then("I see that there are no items in my cart", async function () {
	await cartPage.assertEmptyCart();
});

Then(
	"I can see a qty, title, description, price and a remove button",
	async function () {
		await cartPage.assertProductUIElements();
	},
);

Then("I can update the quantity of product {string}", async function (str) {
	await cartPage.updateQty("1");
});

Then("{string} product is in my cart", async function (productName) {
	await cartPage.assertItemInCart(productName);
});
