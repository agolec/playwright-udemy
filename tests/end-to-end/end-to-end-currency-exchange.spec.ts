import { test, expect } from '@playwright/test'

test.describe.only('Currency Exchange', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign in')
    })

    test('Should convert USD', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/online-banking.html')
        await page.click('#pay_bills_link')

        await page.click("a[href='#ui-tabs-3']")
        await page.selectOption('select#pc_currency', 'JPY')
        await page.click('div.controls #pc_amount')
        await page.type('div.controls #pc_amount', '100')
        await page.click('div.controls #pc_inDollars_true')

        await page.click('input#pc_calculate_costs')

        const conversionAmount = await page.locator(
            'label#pc_conversion_amount'
        )
        await expect(conversionAmount).toBeVisible()
        await expect(conversionAmount).toContainText(
            '8038.59 yen (JPY) = 100.00 U.S. dollar (USD)'
        )

        await page.click('input#purchase_cash')

        const conversionCompleteAlert = await page.locator(
            'div#alert_container'
        )
        await expect(conversionCompleteAlert).toContainText(
            'Foreign currency cash was successfully purchased.'
        )

        // await page.selectOption('#sp_payee', 'apple')
        // await page.click('a#sp_get_payee_details')
        // await page.waitForSelector('#sp_payee_details')
        // await page.selectOption('#sp_account', '6')

        // await page.type('input#sp_amount', '500')
        // await page.type('#sp_date', '2023-04-18')
        // await page.keyboard.press('Enter')
        // await page.type('#sp_description', 'some text')
        // await page.click('input#pay_saved_payees')

        // const message = await page.locator('#alert_content span')
        // await expect(message).toBeVisible()
        // await expect(message).toContainText(
        //     'The payment was successfully submitted.'
        // )
    })
})
