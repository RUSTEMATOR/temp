import test, { expect } from "@playwright/test"
import { LINKS } from "../../src/Data/Links/Links"
import { MAIN_USER } from "../../src/Data/Users/mainUser"
import FavoriteGames from "../../src/PO/NewGames/FavoriteGames"
import playwrightConfig from "../../playwright.config"
import GamePage from "../../src/PO/GamePage/GamePage";
import {sign} from "node:crypto";
import {as} from "@faker-js/faker/dist/airline-D6ksJFwG";

test.describe('Games', () => {
    let favoriteGames: FavoriteGames
    let gamePage: GamePage

    test.beforeEach(async ({page}) => {
        favoriteGames = new FavoriteGames(page)
        gamePage = new GamePage(page)

        await test.step('Navigate to main page', async () => {
            await favoriteGames.navTo(LINKS.newGames)
            await favoriteGames.clickAcceptCookies()
        })

        await test.step('Sign in', async () => {
            const signInModal = await favoriteGames.header.clickSignIn()
            await signInModal.fillEmail(MAIN_USER.email)
            await signInModal.fillPassword(MAIN_USER.password)
            await signInModal.clickSignIn()
            await signInModal.waitForSelector(page.locator('#header_dep_btn'))
        })
    })


    test('Check "Favourite" button', async () => {
        await test.step('Click on "Favourite" button', async () => {
            await favoriteGames.clickOnFavoriteButton()
        })

        await test.step('Go to favorite games page', async () => {
            await favoriteGames.navTo(LINKS.favoriteGames)
            expect(await favoriteGames.getPageUrl()).toBe(`${playwrightConfig.use?.baseURL}${LINKS.favoriteGames}`)
        })

        await test.step('Check the chosen game to be visible', async () => {
            expect(favoriteGames.getFavoriteGameItem).toBeVisible()
        })
    })


    test.afterEach(async () => {
        await favoriteGames.clickOnFavoritePageGameButton()
    })
})


test.describe('Game page', () => {

    let gamePage: GamePage

    test.beforeEach(async ({page}) => {
        gamePage = new GamePage(page)

        await test.step('Navigate to main page', async () => {
            await gamePage.navTo(LINKS.newGames)
            await gamePage.clickAcceptCookies()
        })

        await test.step('Sign in', async () => {
            const signInModal = await gamePage.header.clickSignIn()
            await signInModal.fillEmail(MAIN_USER.email)
            await signInModal.fillPassword(MAIN_USER.password)
            await signInModal.clickSignIn()
            await signInModal.waitForSelector(page.locator('#header_dep_btn'))
        })

        await test.step('Open Fire lightning game', async () => {
            await gamePage.navTo(LINKS.fireLightning)
            await gamePage.triggerSideBarMenu()
        })
    })


    test('Check side bar menu on the game page', async () => {

        await test.step('Trigger sidebar menu', async () => {
            await gamePage.triggerSideBarMenu()
        })

        await test.step('Compare visuals of the sidebar panel', async () => {
            await expect(gamePage.getSideBarPanel).toHaveScreenshot({maxDiffPixels: 100})
        })
    })

    test('Check categories in the side menu on the game page', async () => {
        for (let button of gamePage.sideBarButtons) {
            await test.step(`Expect ${await button.evaluate((el) => el.textContent)} to be visible`, async () => {
                await expect(button).toBeVisible()
            })
        }
    })

    test('Check game search in the sidemenu', async () => {
        await test.step('Click on the search button', async () => {
            await gamePage.clickOnSearchButton()
        })

        await test.step('Fill in the search input', async () => {
            await gamePage.searchForAGame('Elvis Frog true')
        })

        await test.step('Click on the game', async () => {
            await gamePage.clickOnGame()
            await gamePage.clickOnConfirm()
        })

        await test.step('Check link of the game page', async () => {
            await gamePage.sleep(3000)
            expect(await gamePage.getPageUrl()).toBe(`${playwrightConfig.use?.baseURL}${LINKS.elvisFrog}`)
        })
    })

    test('[Desktop only] Check screen modifications on the game page, 2 games at a time', async () => {
        await test.step('Trigger side bar menu', async () => {
            await gamePage.triggerSideBarMenu()
        })

        await test.step('Open second game window', async () => {
            await gamePage.openSecondGameWindow()
        })

        await test.step('Check number of windows', async () => {
            const numberOfWindows = await gamePage.getGameWindow.count()
            expect(numberOfWindows).toBe(2)
        })
    })

    test('[Desktop only] Check screen modifications on the game page, 4 games at a time', async () => {
        await test.step('Trigger side bar menu', async () => {
            await gamePage.triggerSideBarMenu()
        })

        await test.step('Open second game window', async () => {
            await gamePage.openFourGameWindow()
        })

        await test.step('Check number of windows', async () => {
            const numberOfWindows = await gamePage.getGameWindow.count()
            expect(numberOfWindows).toBe(4)
        })
    })

    test('Check currency change on the game page, choose FUN',async () => {
        await test.step('Trigger side bar menu', async () => {
            await gamePage.triggerSideBarMenu()
        })

        await test.step('Open currency dropdown', async () => {
            await gamePage.openCurrencyDropdown()
        })

        await test.step('Get all available currencies in the game', async () => {
            const availableCurrencies = await gamePage.getGameCurrencyList.innerText()
        })

        await test.step('Select currency', async () => {
            await gamePage.selectIngameCurrency('FUN')
        })

        await test.step('Check currency to be FUN', async () => {
            const ingameCurrency = await gamePage.getSidebarCurrencyDropdown.getAttribute('value')
            expect(ingameCurrency).toBe('FUN')
        })
    })


    test('Check Tournament tab in the sidebar', async () => {

        await test.step('Trigger side bar menu', async () => {
            await gamePage.triggerSideBarMenu()
        })

        await test.step('Click on the tournament button', async () => {
            await gamePage.clickOnTournamentButton()
        })

        await test.step('Check tournament tab to be visible', async () => {
            await expect(gamePage.getSidebarTournament).toBeVisible()
        })
    })

})