import test, {expect} from '@playwright/test'
import {MAIN_USER} from "../../src/Data/Users/mainUser";
import SignInModal from "../../src/PO/MainPage/Component/SignInModal";
import MainPage from "../../src/PO/MainPage/MainPage";
import {DepModal} from "../../src/Components/DepModal";
import {LINKS} from "../../src/Data/Links/Links";
import {SEARCH_GAME} from "../../src/Data/ParametrizedData/games/games";
import GamePage from "../../src/PO/GamePage/GamePage";
import {LOCALES} from "../../src/Data/Locales/Locales";



test.describe('Header', () => {
    let signInModal: SignInModal
    let mainPage: MainPage
    let depModal: DepModal
    let gamePage: GamePage

    test.beforeEach(async ({page}) => {


        mainPage = new MainPage(page)
        gamePage = new GamePage(page)

        await test.step('Navigate to main page', async () => {
            await mainPage.navTo(LINKS.Main)
            await mainPage.clickAcceptCookies()
        })

        await test.step('Open sign in modal', async () => {
            signInModal = await mainPage.header.clickSignIn()
        })

        await test.step('Enter valid email', async () => {
            await signInModal.fillEmail(MAIN_USER.email)
        })

        await test.step('Enter valid password', async () => {
            await signInModal.fillPassword(MAIN_USER.password)
        })

        await test.step('Click on "Sign in" button', async () => {
            await signInModal.clickSignIn()
        })

        await test.step('Check if user is logged in', async () => {
            await mainPage.header.waitForSelector(mainPage.header.getDepositButton)
            await expect(mainPage.header.getDepositButton).toBeVisible()
        })
    })


    test('Check the "deposit" button', async () => {

        await test.step('', async () => {
            depModal = await mainPage.header.clickDepositButton()
        })

        await mainPage.page.reload()

        await test.step('Check if deposit modal is opened', async () => {
            await expect(depModal.getDepModal).toBeVisible()
        })
    })

    test('Check "Search your game" input', async () => {

        await test.step('Enter the game name in the search input', async () => {
            await mainPage.header.searchFor(SEARCH_GAME)
        })

        await test.step('Click on the game', async () => {
            await mainPage.header.clickOnGameItem()
        })

        await test.step('Check if game is opened', async () => {
            await expect(gamePage.getGameFrame).toBeVisible()
        })
    })

    test('Check language change dropdown', async () => {
        let listOfLocales: Array<string>

        await test.step('Open lang dropdown', async () => {
            await mainPage.header.openLangDropdown()
        })

        await test.step('Get text of the lang button and dropdown', async () => {
            listOfLocales = await mainPage.header.getLangDropdownLocales()
        })

        await test.step('Compare received list to the expected result', async () => {
            expect(listOfLocales).toEqual(LOCALES)
        })
    })
})