import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page_objects/swag_labs/LoginPage';

test.describe.parallel('login/logout', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goTo();
  });

  test('check bottom accepted username text', async ({ page }) => {
    const text = await loginPage.getValidUsernamePageText();
    console.log(text);
    //test.expect(loginPage.getValidUsernamePageText).toBe('');
  });

  test('INVALID CREDENTIALS - WRONG PASSWORD - check for error window', async ({
    page,
  }) => {
    await loginPage.typeUsername('lmao');
    await loginPage.typePassword('secret_sauce');
    await loginPage.clickLogin();
    await expect(await loginPage.isErrorVisible()).toBe(true);
  });

  test.describe.skip('sanity checks', () => {
    test('INVALID CREDENTIALS - wrong password SANITY CHECK - check for error window is false when it should be true', async ({
      page,
    }) => {
      await loginPage.typeUsername('lmao');
      await loginPage.typePassword('secret_sauce');
      await loginPage.clickLogin();
      //sanity checking. This test should be skipped or ran with the only tag for debugging. this is to make sure that the
      //validation is actually working.
      await expect(await loginPage.isErrorVisible()).toBe(false);
    });
  });
});
