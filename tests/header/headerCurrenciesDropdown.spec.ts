import test, {expect} from "@playwright/test";
import SignInModal from "../../src/PO/MainPage/Component/SignInModal";
import MainPage from "../../src/PO/MainPage/MainPage";
import {DepModal} from "../../src/Components/DepModal";
import GamePage from "../../src/PO/GamePage/GamePage";
import {LINKS} from "../../src/Data/Links/Links";
import {USERS} from "../../src/Data/Users/users";
import {CURRENCIES} from "../../src/Data/Currencies/Currencies";

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
            await signInModal.fillEmail(USERS.currencyUser.email)
        })

        await test.step('Enter valid password', async () => {
            await signInModal.fillPassword(USERS.currencyUser.password)
        })

        await test.step('Click on "Sign in" button', async () => {
            await signInModal.clickSignIn()
        })

        await test.step('Check if user is logged in', async () => {
            await mainPage.header.waitForSelector(mainPage.header.getDepositButton)
            await expect(mainPage.header.getDepositButton).toBeVisible()
        })
    })

    test('Check "Currency" dropdown', async () => {

        await test.step('Open currencies dropdown', async () => {
            await mainPage.header.openCurrenciesDropdown()
        })

        await test.step('Check if currencies are displayed', async () => {
            expect(await mainPage.header.getCurrencies()).toEqual(CURRENCIES)
        })

    })

})