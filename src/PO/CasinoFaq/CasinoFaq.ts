import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage/BasePage";

export default class CasinoFaq extends BasePage {

    private body: Locator

    constructor(page: Page) {
        super(page);

        this.body = page.locator('.help-center__data')
    }

    public async getBodyText(): Promise<string> {
        return await this.body.innerText();
    }

    
}