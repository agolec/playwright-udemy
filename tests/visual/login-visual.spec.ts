import { test } from '@playwright/test'
import { HomePage } from '../../page_objects/HomePage'
import { LoginPage } from '../../page_objects/LoginPage'

test.describe('Login Page Visual Tests', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickSignIn()
    })
    test('Login Form', async ({ page }) => {
        await loginPage.snapshotLoginForm()
    })
    test('Login error message', async ({ page }) => {
        await loginPage.login('failed', 'password is wrong')
        await loginPage.snapshotErrorMessage()
    })
})
