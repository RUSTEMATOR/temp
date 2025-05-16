import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class Complaints extends BasePage {

    private complaintsInfoWindow: Locator

    constructor(page: Page) {
        super(page);

        this.complaintsInfoWindow = page.locator('.help-center__data')
    }

    async getComplaintsInfoText(): Promise<string> {
        return this.complaintsInfoWindow.innerText()
    }

}