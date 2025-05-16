import test, {expect} from "@playwright/test";
import MainPage from "../../src/PO/MainPage/MainPage";
import {LINKS} from "../../src/Data/Links/Links";
import SignInModal from "../../src/PO/MainPage/Component/SignInModal";
import {MAIN_USER} from "../../src/Data/Users/mainUser";
import {USERS} from "../../src/Data/Users/users";
import ReferalProgram from "../../src/PO/ReferalProgram/ReferalProgram";
import playwrightConfig from "../../playwright.config";





test.describe('Referral', () => {
    let mainPage: MainPage
    let refPage: ReferalProgram


    test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page)
        refPage = new ReferalProgram(page)


        await test.step('Navigate to main page', async () => {
            await mainPage.navTo(LINKS.Main)
            await mainPage.clickAcceptCookies()
        })
    })


    test('Check the /referral_program logged in, not eligible', async () => {
        const signInModal: SignInModal = await mainPage.header.clickSignIn()

        await test.step('Sign in', async () => {
            await signInModal.fillEmail(MAIN_USER.email)
            await signInModal.fillPassword(MAIN_USER.password)
            await signInModal.clickSignIn()
        })

        await test.step('Open sidebar menu', async () => {
            await mainPage.header.openBurgerMenu()
        })


        await test.step('Check if referreal button is not visible', async () => {
            await expect(mainPage.sideBarMenu.getReferalButton).not.toBeVisible()
        })
    })

    test('Check the /referral_program - anon', async () => {
        await test.step('Open sidebar menu', async () => {
            await mainPage.header.openBurgerMenu()
        })


        await test.step('Check if referreal button is not visible', async () => {
            await expect(mainPage.sideBarMenu.getReferalButton).not.toBeVisible()
        })
    })

    test('Check the /referral_program. Ref user', async () => {
        const signInModal: SignInModal = await mainPage.header.clickSignIn()

        await test.step('Sign in', async () => {
            await signInModal.fillEmail(USERS.referalUser.email)
            await signInModal.fillPassword(USERS.referalUser.password)
            await signInModal.clickSignIn()
        })

        await test.step('Open sidebar menu', async () => {
            await mainPage.header.openBurgerMenu()
        })

        await test.step('Open referal program page', async () => {
            await mainPage.sideBarMenu.clickOnRefferalButton()
        })

        await test.step('Check link of the page', async () => {
            expect(await refPage.getPageUrl()).toEqual(`${playwrightConfig.use?.baseURL}${LINKS.referalProgram}`)
        })

        await test.step('Verify elements on the page', async () => {
            await expect.soft(refPage.getTitle).toHaveText('Referral Program')
            await expect.soft(refPage.getRefBonusBlock).toBeVisible()
            await expect.soft(refPage.getRefPageStepper).toBeVisible()
            await expect.soft(refPage.getRefFAQ).toBeVisible()
            await expect.soft(refPage.getRefTermsAndCond).toBeVisible()
        })

        await test.step('Click on the create referral link: button', async () => {
            await refPage.clickGenerateLinkButton()
        })

        await test.step('Check link of the page', async () => {
            await refPage.getProfileReferalLinkForm.waitFor()
            expect(await refPage.getPageUrl()).toMatch(new RegExp(`${playwrightConfig.use?.baseURL}${LINKS.refProgramProfile}`))
        })

        await test.step('Check if link input is not empty', async () => {
            await expect(refPage.getRefLinkInputField).not.toHaveValue('')
        })
    })
})