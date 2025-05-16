import test, {expect} from '@playwright/test'
import MainPage from "../../src/PO/MainPage/MainPage";
import {LINKS} from "../../src/Data/Links/Links";
import SignInModal from "../../src/PO/MainPage/Component/SignInModal";
import {PasswordRecovery} from "../../src/PO/PasswordRecovery/PasswordRecovery";
import {ERRORS} from "../../src/Data/Errors/errors";
import {INVALID_USER} from "../../src/Data/Users/invalidUser";
import {MAIN_USER} from "../../src/Data/Users/mainUser";



test.describe('Log In', () => {
    let mainPage: MainPage;
    let signInModal: SignInModal
    let passwordRecovery: PasswordRecovery

    test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page);
        passwordRecovery = new PasswordRecovery(page)

        await test.step('Navigate to main page', async () => {
            await mainPage.navTo(LINKS.Main);
            await mainPage.clickAcceptCookies();
        })

        await test.step('Open Sign in form', async () => {
            signInModal = await mainPage.header.clickSignIn()
        })
    })


    test('Negative. Check password field. Empty field password', async () => {

        await test.step('Fill in password input with an empty string', async () => {
            await signInModal.fillPassword('')
            await signInModal.getPasswordInput.blur()
        })

        await test.step('Check password field error', async () => {
            await expect(signInModal.getpasswordInputError).toBeVisible()
            await expect(signInModal.getpasswordInputError).toContainText(ERRORS.passwordEmpty)
        })
    })

    test('Negative. Check email field. Empty field email', async () => {

        await test.step('Fill in email input with an empty string', async () => {
            await signInModal.fillEmail('')
            await signInModal.getEmailInput.blur()
        })

        await test.step('Check email field error', async () => {
            await expect(signInModal.getEmailInputError).toBeVisible()
            await expect(signInModal.getEmailInputError).toContainText(ERRORS.emailEmpty)
        })
    })

    test('Negative. Check Login function. Invalid info', async () => {

        await test.step('Enter invalid email', async () => {
            await signInModal.fillEmail(INVALID_USER.email)
        })

        await test.step('Enter invalid password', async () => {
            await signInModal.fillPassword(INVALID_USER.password)
        })

        await test.step('Click on Sign In', async () => {
            await signInModal.clickSignIn()
        })

        await test.step('Check invalid credentials error', async () => {
            await expect(signInModal.getInvalidCredsError).toBeVisible()
            await expect(signInModal.getInvalidCredsError).toContainText(ERRORS.invalidLoginCreds)
        })
    })

    test('Negative. Check log in functionality. Correct email wrong password', async () => {
        await test.step('Enter correct email', async () => {
            await signInModal.fillEmail(MAIN_USER.email)
        })

        await test.step('Enter wrong password', async () => {
            await signInModal.fillPassword(MAIN_USER.email)
        })

        await test.step('Click on Sign In', async () => {
            await signInModal.clickSignIn()
        })

        await test.step('Check invalid credentials error', async () => {
            await expect(signInModal.getInvalidCredsError).toBeVisible()
            await expect(signInModal.getInvalidCredsError).toContainText(ERRORS.invalidLoginCreds)
        })
    })


})