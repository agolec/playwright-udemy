import { test, Locator, expect, Page } from '@playwright/test'

export class PaymentPage {
    readonly page: Page
    readonly payeeSelectBox: Locator
    readonly payeeDetailButton: Locator
    readonly payeeDetail: Locator
    readonly accountSelectBox: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.payeeSelectBox = page.locator('#sp_payee')
        this.payeeDetailButton = page.locator('#sp_get_payee_details')
        this.payeeDetail = page.locator('a#sp_get_payee_details')
        this.accountSelectBox = page.locator('#sp_account')
        this.amountInput = page.locator('#sp_amount')
        this.dateInput = page.locator('#sp_date')
        this.descriptionInput = page.locator('#sp_description')
        this.submitPaymentButton = page.locator('input#pay_saved_payees')
        this.message = page.locator('#alert_content span')
    }

    async createPayment() {
        await this.payeeSelectBox.selectOption('apple')
        await this.payeeDetail.click()
        await expect(this.payeeDetail).toBeVisible()
        await this.accountSelectBox.selectOption('6')
        await this.amountInput.type('500')
        await this.dateInput.type('2023-04-18')
        await this.page.keyboard.press('Enter')
        await this.submitPaymentButton.click()
    }
    async assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText(
            'The payment was successfully submitted.'
        )
    }
}
