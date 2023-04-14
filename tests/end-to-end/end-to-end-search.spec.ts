import { test, expect } from '@playwright/test'
import { HomePage } from '../../page_objects/HomePage'

test.describe.only('Search results', () => {
    test('Should find search results', async ({ page }) => {
        let homePage: HomePage = new HomePage(page)
        await homePage.visit()

        await homePage.searchFor('bank')

        const numberOfLinks = await page.locator('li > a')
        await expect(numberOfLinks).toHaveCount(2)
    })
})
