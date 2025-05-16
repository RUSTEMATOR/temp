import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage/BasePage";

export default class BonusTermsAndConditions extends BasePage {
    private bonusTermsAndConditionsTitle: Locator
    private infoBlock: Locator

    constructor(page: Page){
        super(page);

        this.bonusTermsAndConditionsTitle = page.locator('h1').filter({hasText: 'BONUS TERMS & CONDITIONS'})
        this.infoBlock = page.locator('.help-center__data')
    }

    async getInfoBlockText(): Promise<string> {
        return await this.infoBlock.innerText()
    }

    get getBonusTermsAndConditionsTitle(): Locator {
        return this.bonusTermsAndConditionsTitle
    }
}