import test, {expect, Locator} from "@playwright/test";
import {LINKS} from "../../src/Data/Links/Links";
import PromoPage from "../../src/PO/PromoPage/PromoPage";
import playwrightConfig from "../../playwright.config";
import TournamentPage from "../../src/PO/TournamentPage/TournamentPage";
import {DEP_USERS, USERS,} from "../../src/Data/Users/users";
import SignInModal from "../../src/PO/MainPage/Component/SignInModal";
import {MAIN_USER} from "../../src/Data/Users/mainUser";


test.describe('Promos', () => {
    let promoPage: PromoPage


    test.beforeEach(async ({page}) => {
        promoPage = new PromoPage(page)

        await test.step('Navigate to main page', async () => {
            await promoPage.navTo(LINKS.promo)
            await promoPage.clickAcceptCookies()
        })
    })



    test('Check VIP tab. Logged out user', async () => {

        let vipCards: Array<Locator> = []
        let index = 1

        await test.step('Click on the VIP tab', async () => {
           await promoPage.openVipTab()
        })

        await test.step('Get all VIP promos', async () => {
            vipCards = await promoPage.getPromoCard.all()
        })

        for (let card of vipCards) {
            await test.step(`Check VIP promos for anon ${index}`, async () => {
                expect.soft(card).toHaveAttribute('class', /promo-item--disabled/)
            })
            index++
            console.log(index)
        }
    })

    test('Check tournaments tab. Logged out user', async () => {
        let tournamentCards: Array<Locator> = []

        await test.step('Click on the tournaments tab', async () => {
            await promoPage.openTournamentsTab()
        })

        await test.step('Get all tournaments', async () => {
            tournamentCards = await promoPage.getTournamentCard.all()
        })

        await test.step('Expect number of tournaments to be greater than 0', async () => {
            await promoPage.page.waitForTimeout(5000)
            expect(tournamentCards.length).toBeGreaterThan(0)
        })
    })

    test('Check "Show more" button above the tournament section', async ({page}) => {
        const tournamentPage = new TournamentPage(page)

        await test.step('Click on the "Show more" button', async () => {
            await promoPage.clickShowMore()
        })

        await test.step('Check transfer to the tournaments page', async () => {
            expect(await promoPage.getPageUrl()).toEqual(`${playwrightConfig.use?.baseURL}${LINKS.Tournaments}`)
        })

        await test.step('Check presence of tournaments on the page', async () => {
            await tournamentPage.getTournamentItem.first().waitFor()
            expect(await tournamentPage.getTournamentItem.count()).toBeGreaterThan(0)
        })
    })

    test('Check "Show more" button on the tournament banners', async () => {
        let href: string

        await test.step('Scroll the page to the bottom', async () => {
            await promoPage.footer.getAskgamblersAwardsLocator.scrollIntoViewIfNeeded()
            const hrefAttr = await promoPage.getTournShowMoreButton.getAttribute('href')
            if(hrefAttr !== null){
                href = hrefAttr
            } else {
                console.log('href is not defined')
            }
        })

        await test.step('Click on the "Show more" button', async () => {
            await promoPage.clickTournShowMore()
        })

        await test.step('Check link of the page', async () => {
            expect(await promoPage.getPageUrl()).toEqual(`${playwrightConfig.use?.baseURL}${href}`)
        })
    })

    for (let [user, creds] of Object.entries(DEP_USERS)) {
        test(`Check "Get it" button for ${user}`, async () => {
            let activePromos: Array<Locator> = []
            let inactivePromos: Array<Locator> = []

            await test.step('Sing in', async () => {
                await promoPage.header.signIn(creds.email, creds.password)
            })

            await test.step('Get all promos and sort', async () => {
                ({activePromos, inactivePromos} = await promoPage.getaAndSortPromos())
            })

            for (let promo of activePromos) {
                await test.step(`Check active promos ${promo}`, async () => {
                    await promoPage.clickOnGetItButton(promo)
                    expect.soft(promoPage.getPromoModal).toBeVisible()
                    await promoPage.clickOnCloseButton()
                })
            }
        })
    }

    for (let [user, creds] of Object.entries(DEP_USERS)) {
        test(`Check "Info" button for ${user}`, async () => {
            let activePromos: Array<Locator> = []
            let inactivePromos: Array<Locator> = []

            await test.step('Sing in', async () => {
                await promoPage.header.signIn(creds.email, creds.password)
            })

            await test.step('Get all promos and sort', async () => {
                ({activePromos, inactivePromos} = await promoPage.getaAndSortPromos())
            })

            for (let promo of activePromos) {
                await test.step(`Check active promos ${promo}`, async () => {
                    await promoPage.clickOnInfoButton(promo)
                    expect.soft(promoPage.getPromoModal).toBeVisible()
                    await promoPage.clickOnCloseButton()
                })
            }
        })
    }

    test('Check "Deposit" button in Pop-up', async () => {

        await test.step('Login', async () => {
            await promoPage.header.signIn(MAIN_USER.email, MAIN_USER.password)
        })

        await test.step('Open a promo card', async () => {
            const allPromos = await promoPage.getPromoCard.all()
            const promoCard = allPromos[0]
            await promoPage.clickOnGetItButton(promoCard)
        })

        await test.step('Click on the "Deposit" button', async () => {
            await promoPage.clickOnPromoCardDepositButton()
        })

        await test.step('Check if deposit modal is open', async () => {
            await expect(promoPage.getPromoDepositButton).toBeVisible()
        })
    })
})

