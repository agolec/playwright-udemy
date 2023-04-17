import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page_objects/LoginPage'
import { HomePage } from '../../page_objects/HomePage'

test.describe('login/logout flow', () => {
    //Before Hook
    let loginPage: LoginPage
    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        await homePage.visit()
    })
    //Negative Scenario.
    test('Negative scenario for login', async ({ page }) => {
        await homePage.clickSignIn()
        await loginPage.login('invalid username', 'invalidPassword')
        await loginPage.assertErrorMessage()
    })
    //Positive Scenario login + logout.
    test('Positive scenario for login + logout', async ({ page }) => {
        await homePage.clickSignIn()
        await loginPage.login('username', 'password')
        await loginPage.navigateToAccountOverview()

        const acctSummaryTab = await page.locator('#account_summary_tab')
        await expect(acctSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL(
            'http://zero.webappsecurity.com/index.html'
        )
    })
})
