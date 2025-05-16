import { BlobOptions } from "buffer";
import BaseComponent from "../../../Components/BaseComponent";
import {Locator, Page} from "@playwright/test";

export default class PromoSection extends BaseComponent {
    private promoCards: Locator
    private closeButton: Locator
    private infoModal: Locator
    private promoSection: Locator
    private sliderButtonOne: Locator
    private sliderButtonTwo: Locator

    private promoCard: (index: number) => Locator;
    private promoInfoButton: (index: number) => Locator;
    private promoGetItButton: (index: number) => Locator;

    constructor(page: Page){
        super(page);

        this.promoCards = this.page.locator('.promo-item');
        this.infoModal = this.page.locator('.promo-modal__container')
        this.closeButton = this.page.locator('button.modal__close-button')
        this.promoSection = this.page.locator('.promos-slider')
        this.sliderButtonOne = this.page.locator('.promos-slider .slick-arrow:nth-of-type(1)')
        this.sliderButtonTwo = this.page.locator('.promos-slider .slick-arrow:nth-of-type(2)')

        this.promoCard = (index) => this.page.locator(`.promo-item:nth-of-type(${index})`)
        this.promoInfoButton = (index) => this.page.locator(`div[data-index='${index}'] .promo-item__info`)
        this.promoGetItButton = (index) => this.page.locator(`div[data-index='${index}'] .promo-item__button`)
    }

    async getNumberOfCards(): Promise<number> {
        return await this.promoCards.count()
    }

    async checkIfPromoCardIsActive(index: number): Promise<boolean> {

        return await this.page.evaluate((i) => {
            const promoCard = document.querySelector(`.promos-slider div[data-index='${i}']`);
            if(promoCard) {

                const isBlurred = promoCard.classList.contains('promo-item__active')

                return !isBlurred;

            } else {
                throw new Error(`No promo cards found on the page`)
            }
        }, index)
    }

    async clickOnInfoButton(index: number): Promise<void> {
        await this.promoInfoButton(index).click()
    }

    async clickOnGetItButton(index: number): Promise<void> {
        await this.promoGetItButton(index).click()
    }

    async expectedPromoCardTOBeVisible(index: number): Promise<boolean>{
        return await this.promoInfoButton(index).isVisible()
    }

    async closeInfoModal(): Promise<void> {
        await this.closeButton.click()
    }

    async clickOnSliderButtonTwo(): Promise<void> {
        await this.sliderButtonTwo.click()
    }

    get getInfoModal(): Locator {
        return this.infoModal
    }

    get getSliderButton(): Locator {
        return this.sliderButtonOne
    }

    get getSliderButtonTwo(): Locator {
        return this.sliderButtonTwo
    }

    get getPromoSection(): Locator {
        return this.promoSection
    }

}