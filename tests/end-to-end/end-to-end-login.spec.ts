import { test, expect } from '@playwright/test'

test.describe('login/logout flow', () => {
    //Before Hook

    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
    })
    //Negative Scenario.
    test('Negative scenario for login', async ({ page }) => {
        await page.click('#signin_button')
        await page.type('#user_login', 'invalid username')
        await page.type('#user_password', 'invalid password')
        await page.click('text=Sign In')

        const errorMessage = page.locator('.alert-error')
        await expect(errorMessage).toContainText(
            'Login and/or password are wrong.'
        )
    })
    //Positive Scenario.
    test('Positive scenario for login + logout', async ({ page }) => {
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign In')

        await page.goto(
            'http://zero.webappsecurity.com/bank/account-activity.html'
        )

        const acctSummaryTab = await page.locator('#account_summary_tab')
        await expect(acctSummaryTab).toBeVisible()
    })
})
