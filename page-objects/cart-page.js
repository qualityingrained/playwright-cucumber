class CartPage {
    async assertItemInCart(itemName) {
        expect(await page.locator('div.inventory_item_name').innerText()).toBe(itemName)
    }

    async assertEmptyCart() {
        await expect(page.locator('button#continue-shopping')).toBeVisible()
        await expect(page.locator('div.cart_item').count()).toEqual(0)
    }

    async assertProductUIElements() {
        await expect(page.locator('div.cart_quantity')).toHaveText('1')
        await expect(page.locator('div.inventory_item_name')).toBeVisible()
        await expect(page.locator('div.inventory_item_desc')).toBeVisible()
        await expect(page.locator('div.inventory_item_price')).toBeVisible()
        await expect(page.getByText('Remove')).toBeVisible()
    }

    async updateQty(num) {
        // This assertion is meant to fail as it is not possible to update the Qty in the cart
        await page.locator('div.cart_quantity').type(num)
        await page.keyboard.press('Enter')
        await expect(page.locator('div.cart_quantity')).toHaveText(num)
    }
}

module.exports = { CartPage }