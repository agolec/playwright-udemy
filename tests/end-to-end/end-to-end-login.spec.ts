import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page_objects/LoginPage'

test.describe.only('login/logout flow', () => {
    //Before Hook
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.visit()
    })
    //Negative Scenario.
    test.only('Negative scenario for login', async ({ page }) => {
        await page.click('#signin_button')
        // await page.type('#user_login', 'invalid username')
        // await page.type('#user_password', 'invalid password')
        // await page.click('text=Sign In')
        await loginPage.login('invalid username', 'invalidPassword')
        await loginPage.assertErrorMessage()

        // const errorMessage = page.locator('.alert-error')
        // await expect(errorMessage).toContainText(
        //     'Login and/or password are wrong.'
        // )
    })
    //Positive Scenario login + logout.
    test.only('Positive scenario for login + logout', async ({ page }) => {
        await page.click('#signin_button')
        // await page.type('#user_login', 'username')
        // await page.type('#user_password', 'password')
        // await page.click('text=Sign In')
        await loginPage.login('username', 'password')

        await page.goto(
            'http://zero.webappsecurity.com/bank/account-activity.html'
        )

        const acctSummaryTab = await page.locator('#account_summary_tab')
        await expect(acctSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL(
            'http://zero.webappsecurity.com/index.html'
        )
    })
})
