import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage/BasePage"

export default class PrivacyPolicy extends BasePage {
    private privacyPolicyTitle: Locator
    private infoBlock: Locator

    constructor(page: Page) {
        super(page);

        this.privacyPolicyTitle = page.locator('h1')
        this.infoBlock = page.locator('.content')
    }

    async getPrivacyPolicyText(): Promise<string> {
        return await this.infoBlock.innerText()
    }

    get PrivacyPolicyTitle(): Locator {
        return this.privacyPolicyTitle
    }

    

}