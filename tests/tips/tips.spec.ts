import { test, expect } from '@playwright/test';

//testInfo will tell you a lot of information about the test you are running. It will give
//you access to a lot of different pieces of information inside of it.
test.describe('Tips & Tricks Section', () => {
  test('TestInfo Object', async ({ page }, testInfo) => {
    await page.goto('https://www.example.com');
    console.log(testInfo.expectedStatus);
  });

  test('Test Skip Browser', async ({ page, browserName }) => {
    //use test.skip to skip a test on a certain browser.
    test.skip(
      browserName === 'chromium',
      'feature not ready in chrome browser'
    );
    await page.goto('https://www.example.com');
  });

  //indicates a problem with test code. Not the application itself.
  test('Test FixMe Annotation', async ({ page, browserName }) => {
    //use test.skip to skip a test on a certain browser.
    //test.fixme(browserName === 'chromium', 'test is not stable. Needs revision at a later sprint')
    await page.goto('https/www.eample.com');
    //in order to retry a failing test, you add --retries=4 or something to your commands and flags to run the test
    // npx playwright test --config=playwright.config.ts --project=Chromium --retries=4
  });

  //parameterization
  const people = ['Mike', 'Judy', 'Peter', 'Eli', 'Alice'];

  for (const name of people) {
    test(`running test for ${name}`, async ({ page }) => {
      await page.goto('http://zero.webappsecurity.com/index.html');
      await page.type('#searchTerm', `${name}`);
      await page.waitForTimeout(3000);
    });
  }

  test('Mouse Movement Simulation', async ({ page }) => {
    await page.goto('https://www.example-com');
    await page.mouse.move(0, 0);
    await page.mouse.down();
    await page.mouse.move(0, 100);
    await page.mouse.up();
  });

  test('Multiple browser tabs inside one browser', async ({ browser }) => {
    const context = await browser.newContext(); //creates a new browser.
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    const page3 = await context.newPage();

    await page1.goto('https://www.example.com');
    await page2.goto('https://www.example.com');
    await page3.goto('https://www.example.com');
    await page1.waitForTimeout(4000);
  });
  //for device emulation you can specify an environment in playwright when you use the terminal.
  //npx playwright open --device="Nexus 7" wikipedia.org

  //generating custom screenshots
  //npx playwright screenshot --device="iPhone 11" --color-scheme=dark --wait-for-timeout=3000 x.com twitter-iphone-image.png

  //emulating browser language and timezone
  //npx playwright open --timezone="Europe/Rome" --lang="it-IT" google.com
});
