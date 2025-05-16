import {Locator, Page} from "@playwright/test";

export default class BaseComponent {
    public page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async sleep(miliseconds: number): Promise<void> {
        await this.page.waitForTimeout(miliseconds)
    }

    async getPageUrl(): Promise<string>{
        return this.page.url()
    }

    async waitForSelector(locator: Locator): Promise<void>{
    await locator.waitFor({state: "visible"})
  }
}