import {test,expect} from '@playwright/test'

//testInfo will tell you a lot of information about the test you are running. It will give 
//you access to a lot of different pieces of information inside of it.
test.describe("Tips & Tricks Section", () => {
    test("TestInfo Object", async ({page}, testInfo ) => {
        await page.goto('https://www.example.com')
        console.log(testInfo.expectedStatus)
    })

    test("Test Skip Browser", async ({page, browserName}) =>{
        //use test.skip to skip a test on a certain browser.
        test.skip(browserName === 'chromium', 'feature not ready in chrome browser')
        await page.goto('https://www.example.com')
    })

    //indicates a problem with test code. Not the application itself.
    test("Test FixMe Annotation", async ({page, browserName}) =>{
        //use test.skip to skip a test on a certain browser.
        //test.fixme(browserName === 'chromium', 'test is not stable. Needs revision at a later sprint')
        await page.goto('https/www.eample.com')
        //in order to retry a failing test, you add --retries=4 or something to your commands and flags to run the test
        // npx playwright test --config=playwright.config.ts --project=Chromium --retries=4
    })

    //parameterization
    const people = ['Mike','Judy','Peter','Eli','Alice']

    for(const name of people){
        test.only(`running test for ${name}`, async ({page}) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.type("#searchTerm", `${name}`)
            await page.waitForTimeout(3000)
        })
    }
})


