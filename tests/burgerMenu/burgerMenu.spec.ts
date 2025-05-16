import test, {expect} from '@playwright/test'
import MainPage from "../../src/PO/MainPage/MainPage";
import {LINKS} from "../../src/Data/Links/Links";
import {MAIN_USER} from "../../src/Data/Users/mainUser";
import SignInModal from "../../src/PO/MainPage/Component/SignInModal";
import SidebarMenu from "../../src/Components/SidebarMenu";
import PromoPage from "../../src/PO/PromoPage/PromoPage";
import playwrightConfig from "../../playwright.config";
import ProfilePage from "../../src/PO/PlayersProfile/ProfilePage";
import TournamentPage from "../../src/PO/TournamentPage/TournamentPage";
import VipPage from "../../src/PO/VipPage/VipPage";
import LegendPage from "../../src/PO/LegendPage/LegendPage";
import MobileAppPage from "../../src/PO/MobileAppPage/MobileAppPage";




test.describe('Burger menu', () => {
    let mainPage: MainPage
    let signInModal: SignInModal
    let burgerMenu: SidebarMenu
    let promoPage: PromoPage
    let profilePage: ProfilePage
    let tournamentPage: TournamentPage
    let vipPage: VipPage
    let legendPage: LegendPage
    let mobileAppPage: MobileAppPage


    test.beforeEach(async ({page}) => {

        mainPage = new MainPage(page)
        promoPage = new PromoPage(page)
        profilePage = new ProfilePage(page)
        tournamentPage = new TournamentPage(page)
        vipPage = new VipPage(page)
        legendPage = new LegendPage(page)
        mobileAppPage = new MobileAppPage(page)

        await test.step('Navigate to the main page', async () => {
            await mainPage.navTo(LINKS.Main)
            await mainPage.clickAcceptCookies()
        })

        await test.step('Login', async () => {
            signInModal = await mainPage.header.clickSignIn()

            await signInModal.fillEmail(MAIN_USER.email)
            await signInModal.fillPassword(MAIN_USER.password)
            await signInModal.clickSignIn()
            await mainPage.waitForSelector(mainPage.header.getDepositButton)
        })

        await test.step('Open burger menu', async () => {
            burgerMenu = await mainPage.clickOnSidebarButton()
        })
    })

    test('Burger menu', async () => {
        await test.step('Check sidebar is open', async () => {
            await expect(burgerMenu.getSidebarMenu).toBeVisible()
        })
    })

    test('Check "Promotions" button', async () => {

        await test.step('Click on the promotions button', async () => {
            await burgerMenu.openPromotionsTab()
        })

        await test.step('Check link of the page', async () =>{
            const actualUrl = await promoPage.getPageUrl()

            expect(actualUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.Promo}`)
        })

        await test.step('Check number of promos to be bigger than 1', async () => {
            const allPromoCards = await promoPage.getPromoCard.all()
            expect(allPromoCards.length).toBeGreaterThan(1)
        })
    })

    test('Check "Tournaments" button', async () => {
        await test.step('Click on the "tournaments" button', async () => {
            await burgerMenu.openTournamentsTab()
        })

        await test.step('Check link of the page', async () => {
            const actualUrl = await tournamentPage.getPageUrl()

            expect(actualUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.Tournaments}`)
        })

        await test.step('Check tournament card to be visible', async () => {
            await expect(tournamentPage.getTournamentItem).toBeVisible()
        })

    })

    test('Check "VIP" button', async () => {
        await test.step('Click on the "VIP" button', async () => {
            await burgerMenu.openVipTab()
            await vipPage.getVipPageLogo.waitFor({state: "visible"})
        })

        await test.step('Check link of the page', async () => {
            const actualUrl = await promoPage.getPageUrl()

            expect(actualUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.Vip}`)
        })

        await test.step('Check VIP card to be visible', async () => {
            await expect(vipPage.getCurrentStatusImage).toBeVisible()
        })
    })

    test('Check "Legend" button', async () => {
        await test.step('Click on the "Legend" button', async () => {
            await burgerMenu.openLegendTab()
        })

        await test.step('Check link of the page', async () => {
            const actualUrl = await promoPage.getPageUrl()

            expect(actualUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.Legend}`)
        })

        await test.step('Check title of the page', async () => {
            await expect(legendPage.getLegendTitle).toBeVisible()
        })
    })

    test('Check Check "Mobile app" button', async () => {
        await test.step('Click on the "Mobile app" button', async () => {
            await burgerMenu.clickOnMobileAppButton()
        })
        await test.step('Check link of the page', async () => {
            const actualUrl = await mobileAppPage.getPageUrl()

            expect(actualUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.mobileApp}`)
        })

        await test.step('Check if download button is visible', async () => {
            await expect(mobileAppPage.getDownloadAppButton).toBeVisible()
        })
    })

    test('Account Panel', async () => {

        await test.step('Scrap user info and compare the result', async ()=> {
            const userInfo = await burgerMenu.getUserInfo()
            const expectedUser = () => {
                return {
                    username: MAIN_USER.username,
                    currentStatus: MAIN_USER.status,
                    nextStatus: MAIN_USER.nextStatus,
                    statusPoints: MAIN_USER.statusPoints,
                    statusBar: MAIN_USER.progressBarState
                }
            }

            expect(userInfo).toEqual(expectedUser())
        })
    })

    test('Dropdown Functionality in account block', async () => {

        await test.step('Click on chevrone button', async () => {
            await burgerMenu.unwrapPlayerPanel()
        })

        await test.step('Check class of the user menu block', async () => {
            await expect(burgerMenu.getuserMenu).toHaveClass(burgerMenu.getOpenMenuStatusClass)
        })
    })

    test('Redirects to profile info', async () => {
        const profileTitleText = 'Profile'
        await test.step('Click on chevrone button', async () => {
            await burgerMenu.unwrapPlayerPanel()
        })

        await test.step('Click on Profile info', async () => {
            await burgerMenu.clickOnUserMenuButton('Profile Info')
            await profilePage.page.waitForLoadState()
        })

        await test.step('Check the page that opened', async () => {
            const actualUrl = await profilePage.getPageUrl()

            expect(actualUrl).toEqual(`${playwrightConfig.use?.baseURL}${LINKS.Profile}`)
            expect(await profilePage.getProfileTitle.innerText()).toEqual(profileTitleText)
        })
    })

    test('Redirects to Bonuses', async () => {
         const bonusesTitleText = 'Bonuses'
         await test.step('Click on chevrone button', async () => {
            await burgerMenu.unwrapPlayerPanel()
        })

        await test.step('Click on Bonuses', async () => {
            await burgerMenu.clickOnUserMenuButton('Bonuses')
            await profilePage.page.waitForLoadState()
        })

        await test.step('Check the page that opened', async () => {
            const actualUrl = await profilePage.getPageUrl()

            expect(actualUrl).toEqual(`${playwrightConfig.use?.baseURL}${LINKS.Bonuses}`)
            expect(await profilePage.getProfileTitle.innerText()).toEqual(bonusesTitleText)
        })
    })

    test('Redirects to Bets', async () => {
         const betsTitleText = 'Game History'
         await test.step('Click on chevrone button', async () => {
            await burgerMenu.unwrapPlayerPanel()
        })

        await test.step('Click on Bets', async () => {
            await burgerMenu.clickOnUserMenuButton('Bets')
            await profilePage.page.waitForLoadState()
        })

        await test.step('Check the page that opened', async () => {
            const actualUrl = await profilePage.getPageUrl()

            expect(actualUrl).toEqual(`${playwrightConfig.use?.baseURL}${LINKS.Bets}`)
            expect(await profilePage.getProfileTitle.innerText()).toEqual(betsTitleText)
        })
    })

    test('Redirects to Wallet', async () => {
         const walletTitleText = 'Wallet'
         await test.step('Click on chevrone button', async () => {
            await burgerMenu.unwrapPlayerPanel()
        })

        await test.step('Click on Wallet', async () => {
            await burgerMenu.clickOnUserMenuButton('Wallets')
            await profilePage.page.waitForLoadState()
        })

        await test.step('Check the page that opened', async () => {
            const actualUrl = await profilePage.getPageUrl()

            expect(actualUrl).toEqual(`${playwrightConfig.use?.baseURL}${LINKS.Wallet}`)
            expect(await profilePage.getProfileTitle.innerText()).toEqual(walletTitleText)
        })
    })

    test('Check "Exit" button in the burger menu', async () => {
        await test.step('Click on Exit', async () => {
            await mainPage.clickOnSidebarButton()
        })

        await test.step('Check if burger menu is visible', async () => {
            await expect(burgerMenu.getSidebarMenu).not.toBeVisible()
        })
    })

    test('Check the "Sign out" button', async () => {
        await test.step('Click on Sign Out button', async () => {
            await burgerMenu.clickOnLogoutButton()
        })

        await test.step('Check if user is logged out', async () => {
            await expect(mainPage.header.getCreateAccountButton).toBeVisible()
            await expect(mainPage.header.getSignInButton).toBeVisible()
            await expect(mainPage.getsliderRegForm).toBeVisible()
        })
    })
})