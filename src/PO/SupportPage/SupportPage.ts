import {Locator, Page} from "@playwright/test";
import BasePage from "../BasePage/BasePage";

export default class SupportPage extends BasePage {

    private supportBlock: Locator

    constructor(page: Page) {
        super(page)

        this.supportBlock = page.locator('.support__content')
    }

    get SupportBlock(): Locator {
        return this.supportBlock
    }
}