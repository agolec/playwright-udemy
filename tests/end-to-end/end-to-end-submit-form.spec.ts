import { test, expect } from '@playwright/test'
import { HomePage } from '../../page_objects/HomePage'
import { FeedbackPage } from '../../page_objects/FeedbackPage'

test.describe.only('Feedback Form', () => {
    let homePage: HomePage
    let feedbackPage: FeedbackPage
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)
        homePage.visit()
        homePage.clickFeedbackLink()
    })

    //Reset feedback form.
    test('Reset feedback form', async ({ page }) => {
        await feedbackPage.fillForm(
            'name',
            'email@email.com',
            'subject',
            'some message lmao'
        )
        await feedbackPage.resetForm()
        await feedbackPage.assertReset()
    })
    //Submit.
    test('submit feedback form', async ({ page }) => {
        await feedbackPage.fillForm(
            'name',
            'email@email.com',
            'subject',
            'some message'
        )
        await feedbackPage.assertFeedbackFormSent()
    })
})
