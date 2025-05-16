import {Locator, Page} from "@playwright/test";
import BaseComponent from "../../../Components/BaseComponent";
import SignUpModal from "./SignUpModal";
import {PasswordRecovery} from "../../PasswordRecovery/PasswordRecovery";

export default class SignInModal extends BaseComponent {
    private emailInput: Locator
    private passwordInput: Locator
    private signInButton: Locator
    private forgetPasswordLink: Locator
    private loginWithGoogleButton: Locator
    private createAccountButton: Locator
    private signInModalForm: Locator
    private hideShowPasswordButton: Locator
    private emailInputError: Locator
    private passwordInputError: Locator
    private invalidCredsError: Locator


    constructor(page: Page) {
        super(page);

        this.emailInput = page.locator('#login_modal_email_input')
        this.passwordInput = page.locator('#login_password_input')
        this.signInButton = page.locator('#submit_login')
        this.forgetPasswordLink = page.locator('#forgot_pass_btn')
        this.loginWithGoogleButton = page.locator('.login-form__social .auth-providers__icon').filter({hasText: 'Continue with Google'})
        this.createAccountButton = page.locator('#login_modal_reg_btn')
        this.signInModalForm = page.locator('.sign-in-page')
        this.hideShowPasswordButton = page.locator('.login-form__form-element .password-input__visibility-icon')
        this.emailInputError = page.locator('.sign-in-page__body .login-form__input.input + .collapse .form-element__error')
        this.passwordInputError = page.locator('.sign-in-page__body .password-input + .collapse .form-element__error')
        this.invalidCredsError = page.locator('.errors__error')
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email)
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password)
    }

    async clickSignIn(): Promise<void> {
        await this.signInButton.click()
    }

    async clickForgotPassword(): Promise<void> {
        await this.forgetPasswordLink.click()
    }

    async clickLoginWithGoogle(): Promise<void> {
        await this.loginWithGoogleButton.click()
    }

    async clickCreateAccount(): Promise<SignUpModal> {
        await this.createAccountButton.click()
        return new SignUpModal(this.page)
    }

    async clickOnPasswordVisibilityButton(): Promise<void> {
        await this.hideShowPasswordButton.click()
    }

    get getSignInModalForm(): Locator {
        return this.signInModalForm;
    }

    get getEmailInput(): Locator {
        return this.emailInput;
    }

    get getPasswordInput(): Locator {
        return this.passwordInput;
    }

    get getEmailInputError(): Locator {
        return this.emailInputError;
    }

    get getpasswordInputError(): Locator {
        return this.passwordInputError
    }

    get getInvalidCredsError(): Locator {
        return this.invalidCredsError;
    }
}