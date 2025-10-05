import {test,expect} from '@playwright/test'

//testInfo will tell you a lot of information about the test you are running. It will give 
//you access to a lot of different pieces of information inside of it.
test.describe.only("Tips & Tricks Section", () => {
    test("TestInfo Object", async ({page}, testInfo ) => {
        await page.goto('https://www.example.com')
        console.log(testInfo.expectedStatus)
    })

    test("Test Skip Browser", async ({page, browserName}) =>{
        //use test.skip to skip a test on a certain browser.
        test.skip(browserName === 'chromium', 'feature not ready in chrome browser')
        await page.goto('https://www.example.com')
    })
})


