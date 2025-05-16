import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class ProfilePage extends BasePage {
    private profileTitle: Locator;

    constructor(page: Page) {
        super(page);

        this.profileTitle = page.locator('h1')
    }



    get getProfileTitle(): Locator {
        return this.profileTitle
    }
}