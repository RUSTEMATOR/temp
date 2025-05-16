import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage/BasePage"

export default class ResponsibleGamblingPage extends BasePage {

    private responsibleGamblingTitle: Locator

    constructor(page: Page) {
        super(page);

        this.responsibleGamblingTitle = page.locator('h1')
    }

    get getResponsibleGamblingTitle(): Locator {
        return this.responsibleGamblingTitle
    }

}