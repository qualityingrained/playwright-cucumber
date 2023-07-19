const { Given, When, Then } = require('@cucumber/cucumber')
const { CartPage } = require('../page-objects/cart-page')
const { LoginPage } = require('../page-objects/login-page')
const { InventoryPage } = require('../page-objects/inventory-page')

const cartPage = new CartPage()
const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()

Given('I log out with a product in my cart', async function () {
    await loginPage.navigateToLoginPage()
    await loginPage.submitLoginForm('standard_user', 'secret_sauce')
    await inventoryPage.addProductToCart('Sauce Labs Backpack', 0)
})

Then('I see that there are no items in my cart', async function() {
    await cartPage.assertEmptyCart()
})

Then('I can see a qty, title, description, price and a remove button', async function() {
    await cartPage.assertProductUIElements()
})

Then('I can update the quantity of product {string}', async function (str) {
    await cartPage.updateQty('2')

})