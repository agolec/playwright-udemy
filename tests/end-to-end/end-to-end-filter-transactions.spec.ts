import { test, expect } from '@playwright/test'

test.describe.only('Filter Transactions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign in')
    })

    test('Verify the results for each account', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/online-banking.html')
        await page.click('span#account_activity_link')
    })
})
