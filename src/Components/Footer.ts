import { IGameCategories } from "../Interfaces/gameCategories";
import BaseComponent from "./BaseComponent";
import {Locator, Page} from "@playwright/test";

export default class Footer extends BaseComponent {
    private facebookButton: Locator
    private instagramButton: Locator
    private youtubeButton: Locator
    private bankingLink: Locator
    private casinoFaq: Locator
    private casinoDictionary: Locator
    private cryptoFaq: Locator
    private complaints: Locator
    private cookiePolicy: Locator
    private termsAndConditions: Locator
    private privacyPolicy: Locator
    private responsibleGaming: Locator
    private legend: Locator
    private blog: Locator
    private top: Locator
    private new: Locator
    private slots: Locator
    private tableGames: Locator
    private liveCasino: Locator
    private kingsChoice: Locator
    private promotions: Locator
    private tournaments: Locator
    private footerLangDropdown: Locator
    private vip: Locator
    private BonusTermsAndConditions: Locator
    private affiliate: Locator
    private affiliateTermsAndConditions: Locator
    private askgamblersAwards: Locator
    private paymentLogos: Locator
    private nextArrow: Locator

    public gameCategories: IGameCategories

    constructor(page: Page){
        super(page);
        this.facebookButton = page.locator('.social-links__link--facebook')
        this.instagramButton = page.locator('.social-links__link--instagram')
        this.youtubeButton = page.locator('.social-links__link--youtube')
        this.bankingLink = page.locator('.footer-menu__link--online-casino-payments');
        this.casinoFaq = page.locator('.footer-menu__link--casino-faq')
        this.casinoDictionary = page.locator('.footer-menu__link--dictionary')
        this.cryptoFaq = page.locator('.footer-menu__link--btc-faq')
        this.complaints = page.locator('.footer-menu__link--complaints')
        this.cookiePolicy = page.locator('.footer-menu__link--cookie-policy')
        this.termsAndConditions = page.locator('.footer-menu__link--terms-and-conditions')
        this.privacyPolicy = page.locator('.footer-menu__link--privacy-policy')
        this.responsibleGaming = page.locator('.footer-menu__link--responsible-gaming')
        this.legend = page.locator('.footer-menu__link--the-legend')
        this.blog = page.locator('.footer-menu__link--blog')
        this.top = page.locator('.footer-menu__link--top_casino_games')
        this.new = page.locator('.footer-menu__link--new_online_games')
        this.slots = page.locator('.footer-menu__link--slots')
        this.tableGames = page.locator('.footer-menu__link--casino_table_games')
        this.liveCasino = page.locator('.footer-menu__link--live_casino')
        this.promotions = page.locator('.footer-menu__link--promotions')
        this.tournaments = page.locator('.footer-menu__link--tournaments')
        this.kingsChoice = page.locator('.footer-menu__link--hot_games')
        this.vip = page.locator('.footer-menu__link--vip-club')
        this.BonusTermsAndConditions = page.locator('.footer-menu__link--bonus-terms-conditions')
        this.affiliate = page.locator('.footer-menu__link--affiliate')
        this.affiliateTermsAndConditions = page.locator('.footer-menu__link--affiliate-terms-conditions')
        this.footerLangDropdown = page.locator('#footer_lang_dropdown')
        this.askgamblersAwards = page.locator('.ask-footer')
        this.paymentLogos = page.locator('footer .slick-track > div[data-index][style]')
        this.nextArrow = page.locator('footer .slick-next')


        this.gameCategories = {
            // this.lobby,
            New:{
                locator: this.new,
                title: 'New online games'
            },
            Top: {
                locator: this.top,
                title: 'Top casino games'
            },
            Popular: {
                locator: this.kingsChoice,
                title: "King's Choice"
            },
            Slots: {
                locator: this.slots,
                title: 'Slots'
            },
            Live: {
                locator: this.liveCasino,
                title: 'Live casino'
            },
            Table: {
                locator: this.tableGames,
                title: 'Casino table games'
            }
        }
    }

    async openGameCategory(gameCategory: Locator): Promise<void> {
        await gameCategory.click()
    }

    async openFooterLangDropdown(): Promise<void> {
        await this.footerLangDropdown.click()
    }

    async getFooterLangDropdownLocales(){
        return await this.page.evaluate(() => {

            const dropdownList = document.querySelector('#footer_lang_dropdown')
            const dropdownButton = document.querySelector('#footer_lang_dropdown-menu')

            const aText = (dropdownButton as HTMLElement).innerText

            const bText = (dropdownList as HTMLElement).innerText

            const allText = `${bText}\n ${aText}`

            return allText.split('\n').map(code => code.trim())
        })
    }

    async clickOnFacebookButton(): Promise<void> {
        await this.facebookButton.click()
    }

    async clickOnInstagramButton(): Promise<void> {
        await this.instagramButton.click()
    }

    async clickOnYoutubeButton(): Promise<void> {
        await this.youtubeButton.click()
    }

    async openBankingPage(): Promise<void> {
        await this.bankingLink.click()
    }

    async openCasinoFaqPage(): Promise<void> {
        await this.casinoFaq.click()
    }

    async openCasinoDictionaryPage(): Promise<void> {
        await this.casinoDictionary.click()
    }

    async openCryptoFaqPage(): Promise<void>  {
        await this.cryptoFaq.click()
    }

    async openComplaintsPage(): Promise<void> {
        await this.complaints.click()
    }

    async openCookiePolicyPage(): Promise<void> {
        await this.cookiePolicy.click()
    }

    async openTermsAndConditionsPage(): Promise<void> {
        await this.termsAndConditions.click()
    }

    async openPrivacyPolicyPage(): Promise<void> {
        await this.privacyPolicy.click()
    }

    async openResponsibleGamingPage(): Promise<void> {
        await this.responsibleGaming.click()
    }

    async openLegendPage(): Promise<void> {
        await this.legend.click()
    }

    async openBlogPage(): Promise<void> {
        await this.blog.click()
    }

    async openTopCasinoGamesPage(): Promise<void> {
        await this.top.click()
    }

    async openNewOnlineGamesPage(): Promise<void> {
        await this.new.click()
    }

    async openSlotsPage(): Promise<void> {
        await this.slots.click()
    }

    async openTableGamesPage(): Promise<void> {
        await this.tableGames.click()
    }

    async openLiveCasinoPage(): Promise<void> {
        await this.liveCasino.click()
    }

    async openPromotionsPage(): Promise<void> {
        await this.promotions.click()
    }

    async openTournamentsPage(): Promise<void> {
        await this.tournaments.click()
    }

    async openVipPage(): Promise<void> {
        await this.vip.click()
    }

    async openBonusTermsAndConditionsPage(): Promise<void> {
        await this.BonusTermsAndConditions.click()
    }

    async openAffiliatePage(): Promise<void> {
        await this.affiliate.click()
    }

    async openAffiliateTermsAndConditionsPage(): Promise<void> {
        await this.affiliateTermsAndConditions.click()
    }

    async askgamblersAwardsChildrenCount():Promise<number> {
        return this.page.evaluate(() => {
            const askgamblersAwards = document.querySelector('.ask-footer')

            if(askgamblersAwards) {
                return askgamblersAwards.childElementCount
            } else {
                throw new Error()
            }
        })
    }

    async getAllPaymentLogos(): Promise<Array<Locator>> {
        return await this.paymentLogos.all()
    }

    async clickOnNextArrow(): Promise<void> {
        await this.nextArrow.click()
    }

    get getAskgamblersAwardsLocator(): Locator {
        return this.askgamblersAwards
    }
}