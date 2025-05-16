import BasePage from "../BasePage/BasePage";
import {Page, Locator} from "@playwright/test";

export default class TermsAndConditions extends BasePage {
    private downloadPdfButton: Locator
    private collapseBlockList: Locator
    
    constructor(page: Page) {
        super(page)
        
        this.downloadPdfButton = page.locator('.download-pdf-button')
        this.collapseBlockList = page.locator('a + .questions-list')
    }

    async getCollapseDropdownText(): Promise<string> {
        return await this.collapseBlockList.innerText()

    }

    get getDownloadPdfButton(): Locator {
        return this.downloadPdfButton
    }
}