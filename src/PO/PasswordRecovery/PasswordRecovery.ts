import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";
import {MAIN_USER} from "../../Data/Users/mainUser";

export class PasswordRecovery extends BasePage {
    public notificationText: string
    public confirmationNotificationText: string

    private didntRecieveInstructionsLink: Locator
    private resendReset: Locator
    private passwordRecoveryNotification: Locator
    private resendConfirmationInstructionsButton: Locator
    private resendConfirmationNotification: Locator
    private emailInput: Locator
    private inputError: Locator


    constructor(page: Page){
        super(page)

        this.notificationText = 'If your email is within our database, an email with instructions on how to recover your password will be sent in a few minutes'
        this.confirmationNotificationText = 'confirmation instructions were sent to your email'

        this.emailInput = page.locator('.input__native')
        this.didntRecieveInstructionsLink = page.locator('.auth-form__instruction-link:nth-of-type(1)')
        this.resendReset = page.locator('.btn--danger')
        this.inputError = page.locator('.form-element__error')
        this.passwordRecoveryNotification = page.locator('.notification__title')
        this.resendConfirmationNotification = page.locator('.notification__title')
        this.resendConfirmationInstructionsButton = page.locator('.auth-form__instruction-link:nth-of-type(2)')
    }

    async clickDidntRecieveInstructions(): Promise<void> {
        await this.didntRecieveInstructionsLink.click()
    }

    async clickResendReset(): Promise<void> {
        await this.resendReset.click()
    }

    async clickResendConfirmationInstructions(): Promise<void> {
        await this.resendConfirmationInstructionsButton.click()
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email)
    }


    get getEmailInput(): Locator {
        return this.emailInput
    }

    get getResendConfirmationInstructionsButton(): Locator {
        return this.resendConfirmationInstructionsButton
    }

    get getDidntRecieveInstructionsLink(): Locator {
        return this.didntRecieveInstructionsLink
    }

    get getResetPasswordButton(): Locator {
        return this.resendReset
    }

    get getPasswordRecoveryNotification(): Locator {
        return this.passwordRecoveryNotification
    }

    get getResendConfirmationNotification(): Locator {
        return this.resendConfirmationNotification
    }

    get getNotificationText(): string {
        return this.notificationText
    }

    get getConfirmationNotificationText(): string {
        return this.confirmationNotificationText
    }

    get getInputError(): Locator {
        return this.inputError
    }
}

