import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class VipPage extends BasePage {
    private currentStatusImage: Locator;
    private vipPageLogo: Locator;
    private vipPageStepper: Locator;
    private cardList: Locator;
    private pageLevelLogo: Locator;
    private contentContainer: Locator;
    private termsAndConditions: Locator;

    constructor(page: Page) {
        super(page);

        this.vipPageLogo = page.locator('.new-vip-page__title')
        this.currentStatusImage = page.locator('.vip-page-head__img')
        this.vipPageStepper = page.locator('.new-vip-page__main  .vip-grid__grid')
        this.cardList = page.locator('section .slick-list')
        this.pageLevelLogo = page.locator('.vip-page-head__level')
        this.contentContainer = page.locator('.container')
        this.termsAndConditions = page.locator('.new-vip-page__section.description')
    }


    get getCurrentStatusImage(): Locator {
        return this.currentStatusImage;
    }

    get getVipPageLogo(): Locator {
        return this.vipPageLogo;
    }

    get getVipPageStepper(): Locator {
        return this.vipPageStepper;
    }

    get getCardList(): Locator {
        return this.cardList;
    }

    get getPageLevelLogo(): Locator {
        return this.pageLevelLogo;
    }

    get getContentContainer(): Locator {
        return this.contentContainer;
    }

    get getTermsAndConditions(): Locator {
        return this.termsAndConditions;
    }
}