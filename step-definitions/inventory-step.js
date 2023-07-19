const { Given, When, Then } = require('@cucumber/cucumber')
const { InventoryPage } = require('../page-objects/inventory-page')
const { LoginPage } = require('../page-objects/login-page')
const { CartPage } = require('../page-objects/cart-page')

const inventoryPage = new InventoryPage()
const loginPage = new LoginPage()
const cartPage = new CartPage()

Given('I am browsing the inventory', async function () {
    // log in
    await loginPage.navigateToLoginPage()
    await loginPage.submitLoginForm('standard_user', 'secret_sauce')

    //ensure there are products to browse
    await inventoryPage.assertInventoryListIsDisplayed()
})

var numOfProductInInventory = 0
When('I look at product number {int}', async function (num) {
    // save the number of the product that is being looked at
    numOfProductInInventory = num - 1
})

When('I sort the products based on price {string}', async function (sorting_option) {
    await inventoryPage.sortProducts(sorting_option)
})

var itemAddedToCartName
When('I click on Add to Cart for product {string}', async function(productName) {
    itemAddedToCartName = productName
    await inventoryPage.addProductToCart(productName, 0)
})

When ('I click on the cart', async function() {
    await inventoryPage.navigateToTheCart()
})

Then ('I can see a title, picture, description, price and a buy button', async function () {
    await inventoryPage.assertSingleProductUIElements(numOfProductInInventory)
})

Then ('I can browse the inventory of products', async function () {
    await inventoryPage.assertInventoryListIsDisplayed()
})

Then ('I can see the products sorted based on the price {string}', async function (sorting_option) {
    await inventoryPage.assertInventoryListIsDisplayed()
    await inventoryPage.assertSorting(sorting_option)
})

Then ('I can see that product in my cart', async function() {
    await inventoryPage.navigateToTheCart()
    await cartPage.assertItemInCart(itemAddedToCartName)
})

Then ('I cannot add product {string} again', async function(productName) {
    await inventoryPage.itemCannotBeAddedToCart(productName)
})