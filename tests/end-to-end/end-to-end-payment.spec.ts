import { test, expect } from '@playwright/test'

test.describe.only('New Payment', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign in')
    })

    test('Should send new payment', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/online-banking.html')
        await page.click('#pay_bills_link')
        await page.selectOption('#sp_payee', 'apple')
        await page.click('a#sp_get_payee_details')
        await page.waitForSelector('#sp_payee_details')
        await page.selectOption('#sp_account', '6')

        await page.type('input#sp_amount', '500')
        await page.type('#sp_date', '2023-04-18')
        await page.keyboard.press('Enter')
        await page.type('#sp_description', 'some text')
        await page.click('input#pay_saved_payees')

        const message = await page.locator('#alert_content span')
        await expect(message).toBeVisible()
        await expect(message).toContainText(
            'The payment was successfully submitted.'
        )
    })
})
