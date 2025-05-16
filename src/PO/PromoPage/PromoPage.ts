import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class PromoPage extends BasePage{

    public defaultPromoIndex: number = 2

    private promoTab: Locator
    private vipTab: Locator
    private tournamentsTab: Locator
    private promoCard: Locator
    private tournamentCard: Locator
    private showMoreButton: Locator
    private trounShowMoreButton: Locator
    private getItPromoButton: Locator
    private promoModal: Locator
    private closeButton: Locator
    private infoButton: Locator
    private promoCardDepositButton: Locator
    private depositModal: Locator

    private tournamentShowMoreButton: (index: number) => Locator



    constructor(page: Page) {
        super(page);

        this.promoTab = page.locator('#promo_promo_tab')
        this.vipTab = page.locator('#promo_promo_vip_tab')
        this.tournamentsTab = page.locator('#promo_tournaments_tab')
        this.promoCard = page.locator('.promo-item')
        this.tournamentCard = page.locator('.tourn-item')
        this.showMoreButton = page.locator('.section-header__button')
        this.trounShowMoreButton = page.locator('.tourn-item__button')
        this.getItPromoButton = page.locator('.promo-item__button')
        this.promoModal = page.locator('.promo-modal')
        this.closeButton = page.locator('.modal__close-icon')
        this.infoButton = page.locator('.btn--info')
        this.promoCardDepositButton = page.locator('.promo-modal__button.deposit-button')
        this.depositModal = page.locator('#fast-deposit')

        this.tournamentShowMoreButton = (index) => page.locator(`.a.tourn-item__button.link-btn:nth-of-type(${index})`)

    }

    async openPromoTab(): Promise<void> {
        await this.promoTab.click()
    }

    async openVipTab(): Promise<void> {
        await this.vipTab.click()
    }

    async openTournamentsTab(): Promise<void> {
        await this.tournamentsTab.click()
    }


    async getPromoCardNumber(): Promise<number>{
        return await this.promoCard.count()
    }

    async getTournamentCardNumber(): Promise<number>{
        return await this.tournamentCard.count()
    }


    async openTournament(index: number): Promise<void> {
        await this.tournamentShowMoreButton(index).click()
    }

    async clickShowMore(): Promise<void> {
        await this.showMoreButton.click()
    }

    async clickTournShowMore(): Promise<void> {
        await this.trounShowMoreButton.click()
    }

    async clickOnGetItButton(promoCard: Locator): Promise<void> {
        await promoCard.locator(this.getItPromoButton).click()
    }

    async clickOnCloseButton(): Promise<void> {
        await this.closeButton.click()
    }

    async clickOnInfoButton(promoCard: Locator): Promise<void> {
        await promoCard.locator(this.infoButton).click()
    }

    async clickOnPromoCardDepositButton(): Promise<void> {
        await this.promoCardDepositButton.click()
    }

    async getaAndSortPromos(): Promise<{ activePromos: Array<Locator>; inactivePromos: Array<Locator> }> {
        let activePromos: Array<Locator> = []
        let inactivePromos: Array<Locator> = []

        const allPromos: Array<Locator> = await this.getPromoCard.all()

            for (let promo of allPromos){
                const promoClass = await promo.getAttribute('class')

                if (promoClass?.includes('promo-item--disabled')){
                    inactivePromos.push(promo)
                } else {
                    activePromos.push(promo)
                }
            }

        return {activePromos, inactivePromos}
    }

    get getPromoCard(): Locator {
        return this.promoCard
    }

    get getTournamentCard(): Locator {
        return this.tournamentCard
    }

    get getShowMoreButton(): Locator {
        return this.showMoreButton
    }

    get getTournShowMoreButton(): Locator {
        return this.trounShowMoreButton
    }

    get getPromoModal(): Locator {
        return this.promoModal
    }

    get getCloseButton(): Locator {
        return this.closeButton
    }

    get getPromoDepositButton(): Locator {
        return this.promoCardDepositButton
    }

}