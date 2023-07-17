class CartPage {
    async assertItemInCart(itemName) {
        expect(await page.locator('div.inventory_item_name').innerText()).toBe(itemName)
    }

    async assertEmptyCart() {
        expect(await page.locator('button#continue-shopping')).toBeVisible()
        expect(await page.locator('div.cart_item').count()).toEqual(0)
    }

    async assertProductUIElements() {
        expect(await page.locator('div.cart_quantity')).toHaveText('1')
        expect(await page.locator('div.inventory_item_name')).toBeVisible()
        expect(await page.locator('div.inventory_item_desc')).toBeVisible()
        expect(await page.locator('div.inventory_item_price')).toBeVisible()
        expect(await page.getByText('Remove')).toBeVisible()
    }

    async updateQty(num) {
        // This assertion is meant to fail as it is not possible to update the Qty in the cart
        await page.locator('div.cart_quantity').type(num)
        await page.keyboard.press('Enter')
        await expect(page.locator('div.cart_quantity')).toHaveText(num)
    }
}

module.exports = { CartPage }