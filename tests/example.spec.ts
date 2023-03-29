import { test, expect } from '@playwright/test'
import { loadHomePage, assertTitle } from '../helpers'

test('Simple Basic Test', async ({ page }) => {
    //Code goes here.
    page.goto('https://www.example.com')
    const title = await page.locator('h1')
    await expect(title).toContainText('Example Domain')
})

test('Clicking on element', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test('Working with Inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'some username')
    await page.type('#user_password', 'some password')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

//test.describe is an annotation that sets up a test suite.

//since both the tests, 'screenshots' and 'single element screenshot' both go to the same website, we're going to use

// a hook called beforeEach that performs the page.goto operation.
test.describe('Hooks', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com/')
    })

    test('Screenshots', async ({ page }) => {
        //await page.goto('https://example.com/')
        await page.screenshot({ path: 'screenshot.png', fullPage: true })
    })

    test('single element screenshot', async ({ page }) => {
        //await page.goto('https://example.html')
        const element = await page.$('h1')
        await element.screenshot({ path: 'single_element_screenshot.png' })
    })

    test.only('custom helpers', async ({ page }) => {
        await loadHomePage(page)
        await assertTitle(page)
    })
})
