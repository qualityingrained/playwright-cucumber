const { Given, When, Then } = require('@cucumber/cucumber')
const { CartPage } = require('../page-objects/cart-page')

const cartPage = new CartPage()

Then('I see that there are no items in my cart', async function() {
    await cartPage.assertEmptyCart()
})

Then('I can see a qty, title, description, price and a remove button', async function() {
    await cartPage.assertProductUIElements()
})

Then('I can update the quantity of product {int}', async function (num) {
    await cartPage.updateQty('2')

})