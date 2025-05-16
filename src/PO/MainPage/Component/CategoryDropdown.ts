import {Locator} from "@playwright/test";
import {Page} from "@playwright/test";

export default class CategoryDropdown {
    private page: Page
    private accumulatingCategory: Locator
    private bonusBuyCategory: Locator
    private slotsMegaways: Locator
    private slotsCrash: Locator
    private slotsBook: Locator
    private slotsExclusive: Locator

    private liveBlackJack: Locator
    private liveRoulette: Locator
    private liveBaccarat: Locator
    private livePoker: Locator

    private onlineRoulette: Locator
    private onlineBlackJack: Locator
    private onlineBaccarat: Locator

    protected liveCategories: Array<Locator>
    protected slotsCategories: Array<Locator>
    protected tableCategories: Array<Locator>

    private subcategory: Locator

    constructor(page: Page) {
        this.page = page;

        this.accumulatingCategory = page.locator('#slots_accumulating');
        this.bonusBuyCategory = page.locator('#slots_bonus_buy')
        this.slotsMegaways = page.locator('#slots_megaways')
        this.slotsCrash = page.locator('#slots_crash')
        this.slotsBook = page.locator('#slots_book')
        this.slotsExclusive = page.locator('#slots_exclusive')

        this.liveBlackJack = page.locator('#live_blackjack')
        this.liveRoulette = page.locator('#live_roulette')
        this.liveBaccarat = page.locator('#live_baccarat')
        this.livePoker = page.locator('#live_poker')

        this.onlineRoulette = page.locator('#table_online_roulette')
        this.onlineBlackJack = page.locator('#table_online_blackjack')
        this.onlineBaccarat = page.locator('#table_online_baccarat')

        this.subcategory = page.locator('.top-games-menu__link')

        this.slotsCategories = [
            this.accumulatingCategory,
            this.bonusBuyCategory,
            this.slotsMegaways,
            this.slotsCrash,
            this.slotsBook,
            this.slotsExclusive,
        ]

        this.liveCategories = [
            this.liveBlackJack,
            this.liveRoulette,
            this.liveBaccarat,
            this.livePoker,
        ]

        this.tableCategories = [
            this.onlineRoulette,
            this.onlineBlackJack,
            this.onlineBaccarat,
        ]
    }

    async getSubcategories(): Promise<Array<string>>{
        return this.page.evaluate(() => {
            const listOfCategories = document.querySelectorAll('.top-games-menu__link')

            const arrayOfElements =  Array.from(listOfCategories)
            const arrayOfCategoryNames = []
                for (let element of arrayOfElements){
                    let categoryName = (element as HTMLElement).innerText
                    arrayOfCategoryNames.push(categoryName.trim())
            }

            return arrayOfCategoryNames
        })
    }

    async selectSubcategory(subcategory: string): Promise<void>{
        await this.subcategory.filter({hasText: subcategory}).click()
    }
}