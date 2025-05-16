import test, {expect} from "@playwright/test";
import MainPage from "../../src/PO/MainPage/MainPage";
import {LINKS} from "../../src/Data/Links/Links";
import GamePage from "../../src/PO/GamePage/GamePage";
import SignInModal from "../../src/PO/MainPage/Component/SignInModal";
import {MAIN_USER} from "../../src/Data/Users/mainUser";
import {SLIDER_CATEGORIES} from "../../src/Data/Categories/Categories";
import {CATEGORY_DROPDOWN_PARAMS} from "../../src/Data/Constants/CategoryDropdownsLocators";
import SupportMessanger from "../../src/Components/SupportButton";

test.describe('Body', async () => {
    let mainPage: MainPage
    let gamePage: GamePage
    let signInModal: SignInModal

    test.beforeEach(async ({page}) =>{
        mainPage = new MainPage(page)
        gamePage = new GamePage(page)

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
    })


    test('Check if games are clickable in the "Top winners" section', async () => {
        let numberOfGames: number = 0

        await test.step('Scroll to the top winners section', async () => {
            await mainPage.scrollTo(mainPage.getTopWinnersSection)
        })

        await test.step('Get number of games in the top winners section', async () => {
            numberOfGames = await mainPage.getNumberOfTopWinnerGames()
        })

        for (let index = 0; index <= (numberOfGames/2); index++) {
            await test.step(`Navigate back to the main page. Index ${index}`, async () => {
                await mainPage.navTo(LINKS.Main)
                await mainPage.scrollTo(mainPage.getTopWinnersSection)
            })

            await test.step(`Click on each game to open the game page. Index ${index}`, async () => {
                await mainPage.sleep(2000)
                await mainPage.clickOnTopWinnersGame(index)
            })

            await test.step(`Check if a game has been opened ${index}`, async () => {
                await mainPage.sleep(4000)
                await expect.soft(gamePage.getSideBarPanel).toBeVisible()
            })
        }
    })


    test('Check categories in the slider', async () => {
        let actualCategories: Array<string>
        await test.step('Get categories from the slider', async () => {
            const categories = await mainPage.getCategorySlider.innerText()
            const categoriesSet = new Set(categories.split('\n').map(word => word.trim()));
            actualCategories = Array.from(categoriesSet);
        })

        await test.step('Check if the categories match the expected ones', async () => {
            expect(actualCategories).toEqual(SLIDER_CATEGORIES)
        })
    })

    for (const [categoryName, params] of Object.entries(CATEGORY_DROPDOWN_PARAMS) as [string, {
        locator: string,
        expectedResult: Array<string>
    }][]) {
        test(`Check subcategories of ${categoryName}`, async () => {

            await test.step(`Open ${categoryName} dropdown`, async () => {
                await mainPage.clickOnCategoryDropdown(params.locator)

                await mainPage.sleep(1000)
                const dropdownText = await mainPage.getSubCategoryDropdown.innerText()
                const categoriesArray = dropdownText.split('\n').map(string => string.trim())

                expect(categoriesArray).toEqual(params.expectedResult)
            })
        })
    }


    test('Check "Support" button', async () => {
        let intercomWindow: SupportMessanger
        await test.step('Open support window', async () => {
            intercomWindow = await mainPage.clickOnSupportButton()
        })

        await test.step('Check that intercom window opened', async () => {
            await expect(intercomWindow.getIntercomWindow).toBeVisible()
        })
    })
})