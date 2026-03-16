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
});
