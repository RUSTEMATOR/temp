import test, {expect} from '@playwright/test'
import MainPage from "../../src/PO/MainPage/MainPage";
import {LINKS} from "../../src/Data/Links/Links"
import {providersIE, providersIEFilter} from "../../src/Data/Providers/Providers";
import {qase} from "playwright-qase-reporter";
import {IGameCategories} from "../../src/Interfaces/gameCategories";
import {CATEGORY_DROPDOWN_PARAMS} from "../../src/Data/Constants/CategoryDropdownsLocators";
import {MAIN_USER} from "../../src/Data/Users/mainUser";
import SidebarMenu from "../../src/Components/SidebarMenu";
import {CATEGORIES_FILTER} from "../../src/Data/Categories/Categories";
import playwrightConfig from "../../playwright.config";



test.describe('Main page', () => {
    let mainPage: MainPage
    let gameCategories: IGameCategories


    test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page)
        gameCategories = mainPage.gameCategories

        await test.step('Navigate to main page', async () => {
            await mainPage.navTo(LINKS.Main)
            await mainPage.clickAcceptCookies()
        })


        await test.step('Sign in', async () => {
            const signInModal = await mainPage.header.clickSignIn()
            await signInModal.fillEmail(MAIN_USER.email)
            await signInModal.fillPassword(MAIN_USER.password)
            await signInModal.clickSignIn()
        })
    })


    test(`Check "All providers" dropdown`, async () => {

        await test.step('Click on the "All providers" dropdown and check provider names', async () => {
            await mainPage.page.waitForLoadState('domcontentloaded')
            const providers = await mainPage.getAllProviders()
            qase.comment(`${providers}\n\n`)
            expect(providers).toEqual(providersIE)
        })

    })

    for (let i = 1; i < providersIE.length; i++) {

        test(`Check "All providers" filter functionality ${providersIE[i]}`, async () => {

            await test.step('Click on the "All providers" dropdown button', async () => {
                await mainPage.openAllProviders()
            })

            await test.step('Click on a name of one of the providers', async () => {
                const providerName = await mainPage.getProviderName(i)
                console.log(providerName)

                await mainPage.clickOnProvider(i)


            })

            await test.step('Check number of games in the provider category', async () => {
                await mainPage.sleep(800)
                const numberOfGames = await mainPage.getNumberOfGames()

                expect(numberOfGames).toBeGreaterThan(0)
            })
        })
    }


    //7 tests
    test(`Check game category slider functionality`, async () => {
        for (let [categoryName, values] of Object.entries(gameCategories)) {
            await test.step(`Check ${categoryName} category`, async () => {
                await mainPage.openGameCategory(values.locator)
                await mainPage.sleep(800)
                const numberOfGames = await mainPage.getNumberOfGames()
                const categoryTitle = await mainPage.getCategoryTitleName()

                expect.soft(numberOfGames).toBeGreaterThan(0)
                expect.soft(categoryTitle).toMatch(values.title)

            })
        }
    })

    //3 tests
    for (const [categoryName, params] of Object.entries(CATEGORY_DROPDOWN_PARAMS) as [string, {
        locator: string,
        expectedResult: Array<string>
    }][]) {
        test(`Check ${categoryName} Subcategories`, async () => {

            await test.step(`Open ${categoryName} dropdown`, async () => {

                await mainPage.clickOnCategoryDropdown(params.locator)

                const subCategories = await mainPage.categoryDropdown.getSubcategories()

                await mainPage.sleep(300)

                expect(subCategories).toEqual(params.expectedResult)


            })
        })
    }

    for (const [categoryName, params] of Object.entries(CATEGORY_DROPDOWN_PARAMS)) {
        const arrayLength = params.expectedResult.length


        for (let i = 0; i < arrayLength; i++) {
            let subcategory = params.expectedResult[i]

            test(`Check ${subcategory} of ${categoryName}`, async () => {
                await test.step('Open ${subcategory} dropdown', async () => {
                    await mainPage.clickOnCategoryDropdown(params.locator)
                })

                await test.step(`Click on ${subcategory}`, async () => {
                    await mainPage.categoryDropdown.selectSubcategory(subcategory)
                })

                await test.step(`Check games of ${subcategory}`, async () => {
                    await mainPage.page.waitForSelector(mainPage.getGameItemSelector)

                    const numberOfGames = await mainPage.getNumberOfGames()

                    expect(numberOfGames).toBeGreaterThan(0)
                })
            })
        }
    }


    test('Check show more button, Top games', async () => {
        const topGamesCategoryTitle = 'Top casino games'

        await test.step('Click on Top games show more button', async () => {
            await mainPage.clickOnTopShowMoreButton()
        })

        await test.step('Check Top games category title', async () => {
            const categoryTitle = await mainPage.getCategoryTitleName()
            expect.soft(categoryTitle).toMatch(topGamesCategoryTitle)
        })

        await test.step('Check number of games in the Top Category', async () => {
            await mainPage.page.waitForSelector(mainPage.getGameItemSelector)
            const numberOfGames = await mainPage.getNumberOfGames()
            expect.soft(numberOfGames).toBeGreaterThan(0)
        })
    })


    test('Check show more button, New games', async () => {
        const newGamesCategoryTitle = 'New online games'

        await test.step('Click on New games show more button', async () => {
            await mainPage.clickOnNewShowMoreButton()
        })

        await test.step('Check New games category title', async () => {
            const categoryTitle = await mainPage.getCategoryTitleName()
            expect.soft(categoryTitle).toMatch(newGamesCategoryTitle)
        })

        await test.step('Check number of games in the New Category', async () => {
            await mainPage.page.waitForSelector(mainPage.getGameItemSelector)
            const numberOfGames = await mainPage.getNumberOfGames()
            expect.soft(numberOfGames).toBeGreaterThan(0)
        })
    })

    test('Check the show more button, Promo', async () => {

        await test.step('Click on Promo show more button', async () => {
            await mainPage.clickOnPromoShowMoreButton()
        })

        await test.step('Check Promo page url', async () => {
            const promoPageUrl = await mainPage.getPageUrl()
            expect.soft(promoPageUrl).toEqual(`${playwrightConfig.use?.baseURL}${LINKS.Promo}`)
            console.log(promoPageUrl)
        })
    })

    test('Check "Scroll up" button', async () => {
        await test.step('Scroll down to the bottom of the page', async () => {
            await mainPage.sleep(3000)
            await mainPage.scrollTo(mainPage.getPromoShowMoreButton)
        })

        await test.step('Check if scroll up button is visible', async () => {
            const scrollUpButton = await mainPage.scrollUpButton.isVisible()
            expect(scrollUpButton).toBeTruthy()
        })

        await test.step('Click on scroll up button', async () => {
            await mainPage.scrollUpButton.click()
        })

        await test.step('Check if the page has scrolled up', async () => {
            await mainPage.sleep(3000)
            const scrollPosition = await mainPage.page.evaluate(() => window.scrollY)

            expect(scrollPosition).toEqual(0)
        })
    })

    test('Check "Get bonus" button on a promo banner', async () => {
        await mainPage.clickOnGetItButton()

        await expect(mainPage.getPromoModal).toBeVisible()
    })

    test('Check Burger menu functionality', async () => {

        let sidebar: SidebarMenu
        await test.step('Click on the burger menu', async () => {
            sidebar = await mainPage.clickOnSidebarButton()
        })

        await test.step('Check user info block to be visible', async () => {
            await sidebar.page.waitForTimeout(5000)
            await expect.soft(sidebar.getUserInfoBlock).toBeVisible()
        })

        await test.step('Check compoints block to be visible', async () => {
            await expect.soft(sidebar.getCompointsBlock).toBeVisible()
        })

        await test.step('Check promo button to be visible', async () => {
            await expect.soft(sidebar.getPromotionsTab).toBeVisible()
        })

        await test.step('Check tournaments button to be visible', async () => {
            await expect(sidebar.getTournamentsTab).toBeVisible()
        })

        await test.step('Check VIP button to be visible', async () => {
            await expect.soft(sidebar.getVipTab).toBeVisible()
        })

        await test.step('Check legend button to be visible', async () => {
            await expect.soft(sidebar.getLegendTab).toBeVisible()
        })

        await test.step('Check app button to be visible', async () => {
            await expect.soft(sidebar.getAppBtn).toBeVisible()
        })

        await test.step('Visual test of the sidebar', async () => {
            await sidebar.page.setViewportSize({width: 1010, height:870})
            await expect.soft(sidebar.getSidebarMenu).toHaveScreenshot()
        })
    })

    test('Check game filter provider dropdown', async () => {
        await test.step('Click on filter button', async () => {
            await mainPage.header.clickFilterButton()
        })

        await test.step('Open provider dropdown', async () => {
            await mainPage.header.clickFilterProviderButton()
            await mainPage.sleep(1000)
        })

        await test.step('Check provider names', async () => {
            const providersArray = await mainPage.header.getListOfFilterProviders()

            expect(providersArray).toEqual(providersIEFilter)
        })
    })

    test('Check game filter category dropdown', async () => {
        await test.step('Click on filter button', async () => {
            await mainPage.header.clickFilterButton()
        })

        await test.step('Open category dropdown', async () => {
            await mainPage.header.clickFilterCategoriesButton()
            await mainPage.sleep(1000)
        })

        await test.step('Check category names', async () => {
            const categoriesArray = await mainPage.header.getListOfFilterCategories()

            expect(categoriesArray).toEqual(CATEGORIES_FILTER)
        })
    })

})

