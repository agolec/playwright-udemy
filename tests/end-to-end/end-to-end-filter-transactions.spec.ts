import { test, expect } from '@playwright/test'

test.describe('Filter Transactions', () => {
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
        await page.selectOption('#aa_accountId', '2')
        const checkingAccount = await page.locator(
            '#all_transactions_for_account tbody tr'
        )
        await expect(checkingAccount).toHaveCount(3)
        await page.selectOption('#aa_accountId', '4')
        const loanAccount = await page.locator(
            '#all_transactions_for_account tbody tr'
        )
        await expect(loanAccount).toHaveCount(2)

        await page.selectOption('#aa_accountId', '6')
        const brokerageAccount = await page.locator('.well')
        await expect(brokerageAccount).toBeVisible()
    })
})
