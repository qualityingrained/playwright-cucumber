class InventoryPage {
	async assertInventoryListIsDisplayed() {
		await expect(page.locator("div.inventory_item")).toBeTruthy();
	}

	async assertSingleProductUIElements(num) {
		const product = await page.locator("div.inventory_item").nth(num);

		//title
		var title = await product.locator(".inventory_item_name");
		var productTitle = await title.innerText();
		await expect(title).toBeVisible();
		await expect(productTitle).toMatch(/[a-zA-Z]+/);

		// image
		var img = await product.locator("img.inventory_item_img");
		await expect(img).toBeVisible();
		await expect(img).toHaveAttribute("alt", productTitle);

		// description
		await expect(product.locator(".inventory_item_desc")).toBeTruthy();

		// price
		var price = await product.locator(".inventory_item_price").innerText();
		await expect(price).toMatch(/\$[0-9]+\.[0-9]{2}/);

		// buy button
		var submitButton = await product.locator("text=Add to cart");
		await expect(submitButton).toHaveText("Add to cart");
		await expect(submitButton).toBeVisible();
	}

	async sortProducts(value) {
		await page.locator("select.product_sort_container").selectOption(value);
	}

	async assertSorting(value) {
		if (["lohi", "hilo"].includes(value)) {
			var listOfPrices = await page
				.locator("div.inventory_item_price")
				.all();

			for (var i = 0; i < listOfPrices.length; i++) {
				var price = await listOfPrices[i].innerText();
				price = +price.substring(1);
				listOfPrices[i] = price;
			}
			for (var i = 0; i < listOfPrices.length - 1; i++) {
				if (value == "lohi") {
					expect(listOfPrices[i]).toBeLessThanOrEqual(listOfPrices[i + 1]);
				} else {
					expect(listOfPrices[i]).toBeGreaterThanOrEqual(
						listOfPrices[i + 1],
					);
				}
			}
		} else {
			var listOfTitles = await page.locator(".inventory_item_name").all();
			for (var i = 0; i < listOfTitles.length; i++) {
				listOfTitles[i] = await listOfTitles[i].innerText();
			}
			if (value == "az") {
				for (var i = 0; i < listOfTitles.length - 1; i++) {
					// compares the A-Z sorting of strings, returns 1 if i+1 comes after i
					expect(listOfTitles[i + 1].localeCompare(listOfTitles[i])).toBe(
						1,
					);
				}
			} else {
				for (var i = 0; i < listOfTitles.length - 1; i++) {
					// compares the A-Z sorting of strings, returns 1 if i comes after i+1
					expect(listOfTitles[i].localeCompare(listOfTitles[i + 1])).toBe(
						1,
					);
				}
			}
		}
	}

	async addProductToCart(productName, itemsAlreadyInCart) {
		var productNumber = await this.findProductOnPage(productName, false);
		var product = await page.locator("div.inventory_item").nth(productNumber);
		var productName = await product
			.locator(".inventory_item_name")
			.innerText();

		// click on the CTA
		await product.getByText("Add to Cart").click();

		// verify if added to the cart
		await expect(page.locator(".shopping_cart_badge")).toBeVisible();
		await expect(await page.locator(".shopping_cart_badge").innerText()).toBe(
			"" + (itemsAlreadyInCart + 1),
		);
	}

	async navigateToTheCart() {
		await page.locator("a.shopping_cart_link").click();
	}

	async itemCannotBeAddedToCart(productName) {
		var productNumberOnPage = await this.findProductOnPage(
			productName,
			false,
		);
		var product = await page
			.locator("div.inventory_item")
			.nth(productNumberOnPage);
		await expect(product.locator("button")).toHaveText("Remove");
	}

	// helper functions
	async findProductOnPage(name, cssSelector) {
		// find the specific product in the list of products
		const allProductTitles = await page
			.locator("div.inventory_item_name")
			.allInnerTexts();
		var index = allProductTitles.findIndex((el) => el == name);

		// if cssSelector == true - we add one because CSS Selectors are 1-based
		if (cssSelector) {
			return index + 1;
		}
		return index;
	}
}

module.exports = { InventoryPage };
