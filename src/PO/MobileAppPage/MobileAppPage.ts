import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class MobileAppPage extends BasePage {


    private downloadAppButton: Locator
    constructor(page: Page){
        super(page)

        this.downloadAppButton = page.locator('.apk-buttons__item')
    }


    get getDownloadAppButton() {
        return this.downloadAppButton
    }
}