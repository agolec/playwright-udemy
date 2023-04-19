import { test } from '@playwright/test'
import { HomePage } from '../../page_objects/HomePage'
import { LoginPage } from '../../page_objects/LoginPage'
import { PaymentPage } from '../../page_objects/PaymentPage'
import { Navbar } from '../../page_objects/components/Navbar'

test.describe.only('New Payment', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage
    let navbar: Navbar

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        paymentPage = new PaymentPage(page)
        navbar = new Navbar(page)

        await homePage.visit()
        await homePage.clickSignIn()
        await loginPage.login('username', 'password')
    })

    test('Should send new payment', async ({ page }) => {
        await page.goto(
            'http://zero.webappsecurity.com/bank/account-summary.html'
        )
        navbar.clickOnTab('Pay Bills')

        await paymentPage.createPayment()
        await paymentPage.assertSuccessMessage()
    })
})
