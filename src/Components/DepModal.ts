import BaseComponent from "./BaseComponent";
import {Locator, Page} from "@playwright/test";

export class DepModal extends BaseComponent {
    private depModal: Locator

    constructor(page: Page) {
        super(page);

        this.depModal = page.locator('.fast-deposit-modal')
    }


    get getDepModal(): Locator {
        return this.depModal
    }
}