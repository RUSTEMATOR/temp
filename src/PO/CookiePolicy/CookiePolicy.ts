import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage/BasePage";

export default class CookiePolicyPage extends BasePage {
    private cookiePolicyTitle: Locator

    constructor(page: Page) {
        super(page);

        this.cookiePolicyTitle = page.locator('h1')
    }

    get getCookiePolicyTitle(): Locator {
        return this.cookiePolicyTitle
    }
}