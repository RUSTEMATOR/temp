import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class ReferalProgram extends BasePage {

    private title: Locator
    private refBonusBlock: Locator
    private refPageStepper: Locator
    private refFAQ: Locator
    private refTermsAndCond: Locator
    private generateLinkButton: Locator
    private profileReferalLinkForm: Locator
    private refLinkInputField: Locator

    constructor(page: Page) {
        super(page)
        this.title = page.locator('h1')
        this.refBonusBlock = page.locator('.referral-page__bonus')
        this.refPageStepper = page.locator('.referral-page__steps-list')
        this.refFAQ = page.locator('.referral-page__questions')
        this.refTermsAndCond = page.locator('.description__preview ')
        this.generateLinkButton = page.locator('.referral-page__bonus-button')
        this.profileReferalLinkForm = page.locator('.referral-link-creation-form')
        this.refLinkInputField = page.locator('.input__left-container + input')
    }

    async clickGenerateLinkButton() {
        await this.generateLinkButton.click()
    }

    get getTitle() {
        return this.title
    }
    get getRefBonusBlock() {
        return this.refBonusBlock
    }
    get getRefPageStepper() {
        return this.refPageStepper
    }
    get getRefFAQ() {
        return this.refFAQ
    }
    get getRefTermsAndCond() {
        return this.refTermsAndCond
    }

    get getGenerateLinkButton() {
        return this.generateLinkButton
    }

    get getProfileReferalLinkForm() {
        return this.profileReferalLinkForm
    }
    get getRefLinkInputField() {
        return this.refLinkInputField
    }

}