import { expect, Locator, Page } from '@playwright/test';
import { AbstractPage } from '../AbstractPage';

export class LoginPage extends AbstractPage {
  private readonly userName: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly acceptedNamesText: Locator;
  private readonly passwordForAllUsersTxt: Locator;

  constructor(page: Page) {
    super(page);
    this.userName = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.acceptedNamesText = page.locator('#login_credentials');
    this.passwordForAllUsersTxt = page.locator('.login_password');
  }
  async goTo() {
    await this.page.goto('https://www.saucedemo.com/');
  }
  async login(username: string, password: string) {
    await this.typeUsername(username);
    await this.typePassword(password);
    await this.clickLogin();
  }
  async typeUsername(username: string) {
    await this.userName.click();
    await this.userName.type(username);
  }
  async typePassword(password: string) {
    await this.password.click();
    await this.password.type(password);
  }
  async clickLogin() {
    await this.loginButton.click();
  }
  async getValidUsernamePageText() {
    return await this.acceptedNamesText.innerText();
  }
}
