import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
    //Define our selectors
    //readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator

    //Init selectors using constructor
    constructor(page: Page) {
        //this.page = page
        super(page)
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.submitButton = page.locator('text=Sign In')
        this.errorMessage = page.locator('.alert-error')
    }
    //Define LoginPage methods.
    async navigateToAccountOverview() {
        await this.page.goto(
            'http://zero.webappsecurity.com/bank/account-activity.html'
        )
    }
    async login(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.submitButton.click()
    }
    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText(
            'Login and/or password are wrong.'
        )
    }
}
