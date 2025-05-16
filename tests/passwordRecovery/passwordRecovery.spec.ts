import test, {expect} from '@playwright/test'
import MainPage from "../../src/PO/MainPage/MainPage";;
import {PasswordRecovery} from "../../src/PO/PasswordRecovery/PasswordRecovery";
import {LINKS} from "../../src/Data/Links/Links";
import {MAIN_USER} from "../../src/Data/Users/mainUser";
import {ERRORS} from "../../src/Data/Errors/errors";
import {INVALID_USER} from "../../src/Data/Users/invalidUser";


test.describe('Password recovery', () => {

    let mainPage: MainPage;
    let passwordRecovery: PasswordRecovery


    test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page);
        passwordRecovery = new PasswordRecovery(page)

        await test.step('Navigate to password recovery page', async () => {
            await mainPage.navTo(LINKS.PasswordRecovery);
            await mainPage.clickAcceptCookies();
        })
    })


    test('Check password recovery function', async () => {

        await test.step('Fill email input', async () => {
            await passwordRecovery.fillEmail(MAIN_USER.email)
        })

        await test.step('Check password recovery function', async () => {
            await passwordRecovery.clickResendReset()
        })

        await test.step('Check notification to be visible', async () => {
            await expect.soft(passwordRecovery.getPasswordRecoveryNotification).toBeVisible()
        })

        await test.step('Check text of the notification', async () => {
            await expect(passwordRecovery.getPasswordRecoveryNotification).toHaveText(passwordRecovery.getNotificationText)
        })
    })

    test('Check "Resend confirmation email" functionality', async () => {

        await test.step('Click on "Didn\'t receive confirmation instructions?" button', async () => {
            await passwordRecovery.clickResendConfirmationInstructions()
        })

        await test.step('Enter existing email into email input', async () => {
            await passwordRecovery.fillEmail(MAIN_USER.email)
        })

        await test.step('Click on "Resend" button', async () => {
            await passwordRecovery.clickResendReset()
        })

        await test.step('Check notification to be visible', async () => {
            await expect.soft(passwordRecovery.getResendConfirmationNotification).toBeVisible()
        })

        await test.step('Check text of the notification', async () => {
            await expect(passwordRecovery.getResendConfirmationNotification).toHaveText(passwordRecovery.getConfirmationNotificationText)
        })
    })

    test('Error message about wrong credentials appears', async () => {
        
        await test.step('Press on "Resend" button', async () => {
            await passwordRecovery.clickResendReset()
        })

        await test.step('Check error to be visible', async () => {
            await expect.soft(passwordRecovery.getInputError).toBeVisible()
        })

        await test.step('Check error text', async () => {
            await expect(passwordRecovery.getInputError).toHaveText(ERRORS.emailEmpty)
        })
    })

    test('Negative. Check password recovery. Invalid email', async () => {

        await test.step('Fill email input with invalid email', async () => {
            await passwordRecovery.fillEmail(INVALID_USER.email)
        })

        await test.step('Check password recovery function', async () => {
            await passwordRecovery.clickResendReset()
        })

         await test.step('Check notification to be visible', async () => {
            await expect.soft(passwordRecovery.getPasswordRecoveryNotification).toBeVisible()
        })

        await test.step('Check text of the notification', async () => {
            await expect(passwordRecovery.getPasswordRecoveryNotification).toHaveText(passwordRecovery.getNotificationText)
        })
    })
})