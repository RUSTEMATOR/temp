import BaseComponent from "./BaseComponent";
import {Locator, Page} from "@playwright/test";
import PromoPage from "../PO/PromoPage/PromoPage";

export default class SidebarMenu extends BaseComponent {
    private sidebarMenu: Locator
    private promotionsTab: Locator
    private tournamentsTab: Locator
    private vipTab: Locator
    private bankingTab: Locator
    private legendTab: Locator
    private appBtn: Locator
    private userInfoBlock: Locator
    private compointsBlock: Locator
    private playerPannerWrapper: Locator
    private username: Locator
    private currentStatus: Locator
    private nextStatus: Locator
    private statusPoints: Locator
    private statusBar: Locator
    private userMenu: Locator
    private logoutButton: Locator
    private referalButton: Locator

    private openMenuStatusClass: string

    private profileButton: (text: string) => Locator


    constructor(page: Page) {
        super(page);

        this.sidebarMenu = page.locator('.bar-modal__container')
        this.promotionsTab = page.locator('#bar #burger_promotions_btn')
        this.tournamentsTab = page.locator('#bar #burger_tournaments_btn ')
        this.vipTab = page.locator('#bar #burger_vip_btn')
        this.bankingTab = page.locator('#bar #burger_banking_btn')
        this.legendTab = page.locator('#bar #burger_legend_btn')
        this.appBtn = page.locator('#bar .btn--app')
        this.userInfoBlock = page.locator('#bar').locator('.select-user-menu__section')
        this.compointsBlock = page.locator('#bar').locator('.side-bar')
        this.playerPannerWrapper = page.locator('#bar #downshift-select')
        this.username = page.locator('#bar .user-info-player__nickname')
        this.currentStatus = page.locator('#bar .user-info-player__level')
        this.nextStatus = page.locator('#bar .user-status-player__name')
        this.statusPoints = page.locator('#bar .user-status-player__next-level')
        this.statusBar = page.locator('#bar .progress-bar__track')
        this.userMenu = page.locator('#bar .select-user-menu__dropdown')
        this.logoutButton = page.locator('#bar .logout ')
        this.referalButton = page.locator('#bar .left-header-menu__item--referral_program')

        this.profileButton = (text: string) => page.locator('#bar .user-menu__link ').filter({hasText: text})

        this.openMenuStatusClass = 'select-user-menu__dropdown select-user-menu__dropdown--open'
    }

    async openPromotionsTab(): Promise<void> {
        await this.promotionsTab.click()
    }

    async openTournamentsTab(): Promise<void> {
        await this.tournamentsTab.click()
    }

    async openVipTab(): Promise<void> {
        await this.vipTab.click()
    }

    async openBankingTab(): Promise<void> {
        await this.bankingTab.click()
    }

    async openLegendTab(): Promise<void> {
        await this.legendTab.click()
    }

    async clickAppBtn(): Promise<void> {
        await this.appBtn.click()
    }

    async unwrapPlayerPanel(): Promise<void>{
        await this.playerPannerWrapper.click()
    }

    async getUserInfo(): Promise<Object>{
        const usernameInfo = await this.username.innerText();
        const currentStatusInfo = await this.currentStatus.innerText();
        const nextStatusInfo = await this.nextStatus.innerText();
        const statusPointsInfo = await this.statusPoints.textContent();
        const statusBarInfo = await this.statusBar.getAttribute('style');

        return {
            username: usernameInfo,
            currentStatus: currentStatusInfo,
            nextStatus: nextStatusInfo,
            statusPoints: statusPointsInfo,
            statusBar: statusBarInfo
        }
    }

    async getButtonsOfUserPanel(): Promise<Array<string>> {
            return String(await this.userMenu.innerText()).split('\n').map(word => word.trim())
    }

    async getClassOfUserPanel(): Promise<string | null> {
        return await this.userMenu.getAttribute('class')
    }

    async clickOnUserMenuButton(string: string): Promise<void>{
        await this.profileButton(string).click()
    }

    async clickOnMobileAppButton(): Promise<void> {
        await this.appBtn.click()
    }

    async clickOnLogoutButton(): Promise<void> {
        await this.logoutButton.click()
    }

    async clickOnRefferalButton(): Promise<void> {
        await this.referalButton.click()
    }

    //accessors
    get getSidebarMenu(): Locator {
        return this.sidebarMenu
    }

    get getPromotionsTab(): Locator {
        return this.promotionsTab
    }

    get getTournamentsTab(): Locator {
        return this.tournamentsTab
    }

    get getVipTab(): Locator {
        return this.vipTab
    }

    get getBankingTab(): Locator {
        return this.bankingTab
    }

    get getLegendTab(): Locator {
        return this.legendTab
    }

    get getAppBtn(): Locator {
        return this.appBtn
    }

    get getUserInfoBlock(): Locator {
        return this.userInfoBlock
    }

    get getCompointsBlock(): Locator {
        return this.compointsBlock
    }

    get getuserMenu(): Locator {
        return this.userMenu
    }

    get getOpenMenuStatusClass(): string {
        return this.openMenuStatusClass
    }

    get getReferalButton(): Locator {
        return this.referalButton
    }
}