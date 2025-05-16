import BaseComponent from "./BaseComponent";
import {Locator, Page} from "@playwright/test";

export default class SupportMessanger extends BaseComponent {
    private intercomWindowContainer: Locator

    constructor(page: Page) {
        super(page);

        this.intercomWindowContainer = page.locator('iframe[name="intercom-messenger-frame"]').contentFrame().getByTestId('compactHeader')
    }



    get getIntercomWindow() {
        return this.intercomWindowContainer;
    }
}