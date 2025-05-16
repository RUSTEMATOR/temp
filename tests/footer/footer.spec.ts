import test, { BrowserContext, Page, expect } from "@playwright/test";
import MainPage from "../../src/PO/MainPage/MainPage";
import { LINKS } from "../../src/Data/Links/Links";
import { MAIN_USER } from "../../src/Data/Users/mainUser";
import { isContext } from "vm";
import { LOCALES } from "../../src/Data/Locales/Locales";
import BankingPage from "../../src/PO/BankingPage/BankingPage";
import playwrightConfig from "../../playwright.config";
import FaqPage from "../../src/PO/FAQPage/FaqPage";
import CasinoDictionary from "../../src/PO/CasinoDictionary/CasinoDictionary";
import CryptoFaq from "../../src/PO/CryptoFaq/CryptoFaq";
import LegendPage from "../../src/PO/LegendPage/LegendPage";
import TermsAndConditions from "../../src/PO/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../../src/PO/PrivacyPolicy/PrivacyPolicy";
import ResponsibleGamblingPage from "../../src/PO/ResponsibleGamblingPage/ResponsibleGamblingPage";
import CookiePolicy from "../../src/PO/CookiePolicy/CookiePolicy";
import CookiePolicyPage from "../../src/PO/CookiePolicy/CookiePolicy";
import { IGameCategories } from "../../src/Interfaces/gameCategories";
import PromoPage from "../../src/PO/PromoPage/PromoPage";
import TournamentPage from "../../src/PO/TournamentPage/TournamentPage";
import BonusTermsAndConditions from "../../src/PO/BonusTermsAndConditions/BonusTermsAndConditions";
import VipPage from "../../src/PO/VipPage/VipPage";
import AffiliateTermsAndConditions from "../../src/PO/AffiliateTermsAndConditions/AffiliateTermsAndConditions";
import { affiliateTermsAndConditionsText } from "../../src/Data/ExpectedTextResult/AffiliateTermsAndCondText";

test.describe('Footer', () => {
    let mainPage: MainPage
    let context: BrowserContext
    let page: Page

    test.beforeEach(async ({browser}) => {
        context = await browser.newContext();
        page = await context.newPage();

        mainPage = new MainPage(page)

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

    test.describe('Check "Social" buttons', () => {


        test('Check Facebook button', async () => {
            let facebookPage: Page

            await test.step('Click on Facebook button', async () => {
                [facebookPage] =  await Promise.all([
                    context.waitForEvent('page'),
                    await mainPage.footer.clickOnFacebookButton()
                ])
            })

            await test.step('Check page link', async () => {
                await facebookPage.waitForLoadState()
                const currentUrl = await facebookPage.url()

                expect(currentUrl).toBe(LINKS.facebookLink)
            })
        })

        test('Check Instagram button', async () => {
            let instagramPage: Page

            await test.step('Click on Instagram button', async () => {
                [instagramPage] =  await Promise.all([
                    context.waitForEvent('page'),
                    await mainPage.footer.clickOnInstagramButton()
                ])
            })

            await test.step('Check page link', async () => {
                await instagramPage.waitForLoadState()
                const currentUrl = instagramPage.url()

                expect(currentUrl).toBe(LINKS.instagramLink)
            })
        })

        test('Check Youtube button', async () => {
            let youtubePage: Page

            await test.step('Click on Youtube button', async () => {
                [youtubePage] =  await Promise.all([
                    context.waitForEvent('page'),
                    await mainPage.footer.clickOnYoutubeButton()
                ])
            })

            await test.step('Check page link', async () => {
                await youtubePage.waitForLoadState()
                const currentUrl = youtubePage.url()

                expect(currentUrl).toBe(LINKS.youtubeLink)
            })
        })

    })


    test.describe('Check language dropdown', () => {


        test('Check language change dropdown', async () => {
            let listOfLocales: Array<string>

            await test.step('Open lang dropdown', async () => {
                await mainPage.footer.openFooterLangDropdown()
            })

            await test.step('Get text of the lang button and dropdown', async () => {
                listOfLocales = await mainPage.footer.getFooterLangDropdownLocales()
            })

            await test.step('Compare received list to the expected result', async () => {
                expect(listOfLocales).toEqual(LOCALES)
            })
        })
    })


    test.describe('Check "awards" articles', () => {


        test('Check number of the askgamblers awards', async () => {
            const expectedNumberOfAwards = 5

            await test.step('Check the number of awards', async () => {
                const actualNumeberOfAwards = await mainPage.footer.askgamblersAwardsChildrenCount()
                expect(actualNumeberOfAwards).toEqual(expectedNumberOfAwards)
            })

            await test.step('Visual comparison of the awards', async () => {
                // await mainPage.waitForSelector(mainPage.header.getDepositButton)
                await expect(mainPage.footer.getAskgamblersAwardsLocator).toHaveScreenshot()
            })
        })

    })

    test.describe('Check "Help" column of the information pages', () => {

        test('Check "Casino FAQ"', async () => {
            const faqPage = new FaqPage(page)
            await test.step('Click on the Casino FAQ link', async () => {
                await mainPage.footer.openCasinoFaqPage()
                await expect(faqPage.getQuestionList).toBeVisible()
            })

            await test.step('Check Casino FAQ page url', async () => {
                const currentUrl = await faqPage.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.faqLink}`)
            })
        })

        test('Check "Casino Dictionary"', async () => {
            const casinoDictionary = new CasinoDictionary(page)

            await test.step('Click on the Casino Dictionary link', async () => {
                await mainPage.footer.openCasinoDictionaryPage()
                await expect(casinoDictionary.getPageTitle).toBeVisible()
            })

            await test.step('Check Casino Dictionary page url', async () => {
                const currentUrl = await casinoDictionary.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.casinoDictionary}`)
            })
        })


        test('Check "Crypto FAQ"', async () => {
            const cryptoFaq = new CryptoFaq(page)
            await test.step('Click on the Crypto FAQ link', async () => {
                await mainPage.footer.openCryptoFaqPage()
                await mainPage.page.waitForTimeout(5000)
                await expect(cryptoFaq.getPageTitle).toBeVisible()
            })

            await test.step('Check Crypto FAQ page url', async () => {
                const currentUrl = await cryptoFaq.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.cryptoFaq}`)
            })
        })

    })


    test.describe('Check "Info" column of the info pages', () => {


        test('Check "The legend" page', async () => {
            const theLegendPage = new LegendPage(page)

            await test.step('Click on the Legend link', async () => {
                await mainPage.footer.openLegendPage()
                await expect(theLegendPage.getLegendTitle).toBeVisible()
            })

            await test.step('Check Legend page url', async () => {
                const currentUrl = await theLegendPage.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.Legend}`)
            })
        })

        test('Check "Terms and Conditions" page', async () => {
            const termsAndConditions = new TermsAndConditions(page)

            await test.step('Click on the Terms and Conditions link', async () => {
                await mainPage.footer.openTermsAndConditionsPage()
                await expect(termsAndConditions.getDownloadPdfButton).toBeVisible()
            })

            await test.step('Check Terms and Conditions page url', async () => {
                const currentUrl = await termsAndConditions.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.TermsAndConditions}`)
            })
        })

        test('Check "Privacy policy" page', async () => {
            const privacyPolicy = new PrivacyPolicy(page)

            await test.step('Click on the Privacy Policy link', async () => {
                await mainPage.footer.openPrivacyPolicyPage()
                await expect(privacyPolicy.PrivacyPolicyTitle).toBeVisible()
            })

            await test.step('Check Privacy Policy page url', async () => {
                const currentUrl = await privacyPolicy.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.privacyPolicy}`)
            })
        })

        test('Check "Responsible gambling" page', async () => {
            const responsibleGambling = new ResponsibleGamblingPage(page)

            await test.step('Click on the Responsible gambling link', async () => {
                await mainPage.footer.openResponsibleGamingPage()
                await expect(responsibleGambling.getResponsibleGamblingTitle).toBeVisible()
            })

            await test.step('Check Responsible gambling page url', async () => {
                const currentUrl = await responsibleGambling.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.responsibleGambling}`)
            })
        })

        test('Check "Cookie Policy" page', async () => {

            const cookiePolicy = new CookiePolicyPage(page)

            await test.step('Click on the Cookie Policy link', async () => {
                await mainPage.footer.openCookiePolicyPage()
                await expect(cookiePolicy.getCookiePolicyTitle).toBeVisible()
            })

            await test.step('Check Cookie Policy page url', async () => {
                const currentUrl = await cookiePolicy.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.cookiePolicy}`)
            })
        })

    })


    test.describe('Check "Games" column in the footer', () => {
        let gameCategories: IGameCategories


            test('Click on the "Top" button', async () => {
               gameCategories = mainPage.footer.gameCategories

                for (let [categoryName, values] of Object.entries(gameCategories)) {
                    await test.step(`Check ${categoryName} category`, async () => {
                        await mainPage.openGameCategory(values.locator)
                        await mainPage.sleep(1000)
                        const numberOfGames = await mainPage.getNumberOfGames()
                        const categoryTitle = await mainPage.getCategoryTitleName()

                        expect.soft(numberOfGames).toBeGreaterThan(0)
                        expect.soft(categoryTitle).toMatch(values.title)

                    })
                }
            })
        })


    test.describe('Check "Promotions" column in the footer', () => {

        test('Check "Promotions" button', async () => {
            const promoPage = new PromoPage(page)

            await test.step('Click on the Promotions button', async () => {
                await mainPage.footer.openPromotionsPage()
                await expect(promoPage.getPromoCard).toBeVisible()
            })

            await test.step('Check Promotions page url', async () => {
                const currentUrl = await promoPage.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.Promo}`)
            })
        })

        test('Check "Tournaments" button', async () => {
            const tournamentPage = new TournamentPage(page)

            await test.step('Click on the Tournaments button', async () => {
                await mainPage.footer.openTournamentsPage()
                await expect(tournamentPage.getTournamentItem).toBeVisible()
            })

            await test.step('Check Tournaments page url', async () => {
                const currentUrl = await tournamentPage.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.Tournaments}`)
            })
        })

        test('Check "VIP" button', async () => {
            const vipPage = new VipPage(page)

            await test.step('Click on the VIP button', async () => {
                await mainPage.footer.openVipPage()
                await expect(vipPage.getVipPageLogo).toBeVisible()
            })

            await test.step('Check VIP page url', async () => {
                const currentUrl = await vipPage.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.Vip}`)
            })
        })


        test('Check "Bonus Terms and Conditions" button', async () => {
            const bonusTermsAndConditions = new BonusTermsAndConditions(page)

            await test.step('Click on the Bonus Terms and Conditions button', async () => {
                await mainPage.footer.openBonusTermsAndConditionsPage()
                await expect(bonusTermsAndConditions.getBonusTermsAndConditionsTitle).toBeVisible()
            })

            await test.step('Check Bonus Terms and Conditions page url', async () => {
                const currentUrl = await bonusTermsAndConditions.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.bonusTermsAndConditions}`)
            })
        })
    })



    test.describe('Check "Partners" column in the footer', () => {
        let affiliatePage: Page

        test('Check "Affiliate" button', async () => {


            await test.step('Click on the Affiliate button', async () => {
                [affiliatePage] =  await Promise.all([
                    context.waitForEvent('page'),
                    await mainPage.footer.openAffiliatePage()
                ])
            })

            await test.step('Check Affiliate page url', () => {
                const currentUrl = affiliatePage.url()
                expect(currentUrl).toBe(`${LINKS.affiliate}`)
            })
        })

        test('Check "Affiliate Terms and Conditions" button', async () => {
            const affiliateTermsAndConditions = new AffiliateTermsAndConditions(page)

            await test.step('Click on the Affiliate Terms and Conditions button', async () => {
                await mainPage.footer.openAffiliateTermsAndConditionsPage()
            })

            await test.step('Check text of the page', async () => {
                const text = await affiliateTermsAndConditions.getTextOfThePage()
                expect(text).toEqual(affiliateTermsAndConditionsText)
            })

            await test.step('Check Affiliate Terms and Conditions page url', async () => {
                const currentUrl = await affiliateTermsAndConditions.getPageUrl()
                expect(currentUrl).toBe(`${playwrightConfig.use?.baseURL}${LINKS.affiliateTermsAndConditions}`)
            })
        })
    })


    test('Check if deposit methods logos are looped', async () => {
        await test.step('Check number of the deposit logos', async () => {
            const [firstPaymentLogo] = await mainPage.footer.getAllPaymentLogos()

            const numberOfLogos = (await mainPage.footer.getAllPaymentLogos()).length

            for (let i = 0; i < numberOfLogos; i++) {
                await mainPage.footer.clickOnNextArrow()
                await mainPage.sleep(1000)
            }

            expect(firstPaymentLogo).toHaveAttribute('aria-hidden', 'false')
        })
    })


        test('Blog',async () => {
            let blogPage: Page

            await test.step('Click on the Blog button', async () => {
                [blogPage] =  await Promise.all([
                    context.waitForEvent('page'),
                    await mainPage.footer.openBlogPage()
                ])
            })

            await test.step('Check Blog page url', async () => {
                const currentUrl = blogPage.url()
                expect(currentUrl).toBe(`${LINKS.blog}`)
        })

    })



        test.afterEach(async () => {
            await context.close()
        })

    })
