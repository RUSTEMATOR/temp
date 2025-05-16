import BaseComponent from "../../../Components/BaseComponent";
import {Locator, Page} from "@playwright/test";
import SignInModal from "./SignInModal";


export default class SignUpModal extends BaseComponent{
    private emailInput: Locator
    private passwordInput: Locator
    private countryDropdown: Locator
    private countryDropdownItem: (country: string) => Locator
    private currencyDropdown: Locator
    private currencyDropdownItem: (currency: string) => Locator
    private promoCheckbox: Locator
    private ageCheckbox: Locator
    private crossSaleCheckbox: Locator
    private creacteAccountButton: Locator
    private signInLink: Locator
    private googleRegBtn: Locator
    private closeButton: Locator
    private signUpModal: Locator
    private passwordStateBar: Locator
    private stateText: Locator
    private passwordTip: Locator
    private termsAndConditionsLink: Locator
    private emailInputError: Locator

    constructor(page: Page) {
        super(page);

        this.emailInput = page.locator('#reg_modal_email_input')
        this.passwordInput = page.locator('#reg_modal_password_input')
        this.countryDropdown = page.locator('#reg_modal_country_dropdown')
        this.countryDropdownItem = (country: string) => page.locator('#reg_modal_country_dropdown-menu .select__option').filter({hasText: country})
        this.currencyDropdown = page.locator('#reg_modal_currency_dropdown')
        this.currencyDropdownItem = (currency: string) => page.locator('#reg_modal_currency_dropdown .select__option').filter({hasText: currency})
        this.promoCheckbox = page.locator('[for=\'reg_modal_promo_checkbox\'] .checkbox__point')
        this.ageCheckbox = page.locator('[for=\'reg_modal_age_checkbox\'] .checkbox__point')
        this.crossSaleCheckbox = page.locator('[for=\'reg_modal_cross_sale_checkbox\'] .checkbox__point')
        this.creacteAccountButton = page.locator('#reg_modal_submit_btn')
        this.signInLink = page.locator('#reg_modal_sign_in_btn')
        this.googleRegBtn = page.locator('.auth-providers__icon').filter({hasText: 'Continue with Google'})
        this.closeButton = page.locator('#sign-up .modal__close-button')
        this.signUpModal = page.locator('.modal__content > .registration-form')
        this.passwordStateBar = page.locator('#modal-root .password-input__strength-progress')
        this.stateText = page.locator('#modal-root .password-input__strength-description')
        this.passwordTip = page.locator('.registration-dynamic-form__element--password_single .form-element__error')
        this.termsAndConditionsLink = page.locator('#modal-root a.terms-acceptance__terms-link')
        this.emailInputError = page.locator('#modal-root .form-element__error')
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email)
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password)
    }

    async selectCountry(country: string): Promise<void> {
        await this.countryDropdown.click()
        await this.countryDropdownItem(country).click()
    }

    async selectCurrency(currency: string): Promise<void> {
        await this.currencyDropdown.click()
        await this.currencyDropdownItem(currency).click()
    }

    async checkPromoCheckbox(): Promise<void> {
        await this.promoCheckbox.click()
    }

    async checkAgeCheckbox(): Promise<void> {
        await this.ageCheckbox.click()
    }

    async checkCrossSaleCheckbox(): Promise<void> {
        await this.crossSaleCheckbox.click()
    }

    async clickCreateAccountButton(): Promise<void> {
        await this.creacteAccountButton.click()
    }

    async clickSignInLink(): Promise<SignInModal> {
        await this.signInLink.click()
        return new SignInModal(this.page)
    }

    async clickGoogleRegBtn(): Promise<void> {
        await this.googleRegBtn.click()
    }
    
    async closeSignUpModal(): Promise<void> {
        await this.closeButton.click()
    }

    async createAccount({email, password}: {email: string, password: string}): Promise<void> {
        await this.fillEmail(email)
        await this.fillPassword(password)
        await this.checkAgeCheckbox()
        await this.clickCreateAccountButton()
    }

    async clickOnTermsAndConditionsLink(): Promise<void> {
        await this.termsAndConditionsLink.click()
    }

    async getCurrenciesFromDropdown(): Promise<Array<string>> {
        await this.currencyDropdown.click()

        return await this.page.evaluate(() => {
        const selectList = document.querySelector('.select__list');
        if (!selectList) {
            throw new Error('Select list not found');
        }

        const children = selectList.children;
        const arrayChildren = Array.from(children);

        const array: string[] = [];
        for (const child of arrayChildren) {
            const text = (child as HTMLElement).innerText;
            array.push(text);
        }

        return array;
        })
    }

    async getCountriesFromDropdown(): Promise<Array<string>> {
        await this.countryDropdown.click()

        return await this.page.evaluate(() => {
        const selectList = document.querySelector('.select__list');
        if (!selectList) {
            throw new Error('Select list not found');
        }

        const children = selectList.children;
        const arrayChildren = Array.from(children);

        const array: string[] = [];
        for (const child of arrayChildren) {
            const text = (child as HTMLElement).innerText;
            array.push(text);
        }

        return array;
        })
    }

    async getPassowrdStateText(): Promise<string> {
        const isVisible = await this.passwordTip.isVisible()

        let text1: string | null = ''
        let text2: string | null = ''
        if (isVisible){
             text1 = await this.stateText.textContent()
             text2 = await this.passwordTip.textContent()
        } else {
             text1 = await this.stateText.textContent()
        }


        return `${text1} ${text2}`
    }


    get getSignUpModal() {
        return this.signUpModal;
    }

    get getEmailInput() {
        return this.emailInput;
    }

    get getPasswordInput() {
        return this.passwordInput;
    }

    get getPasswordStateBar() {
        return this.passwordStateBar;
    }

    get getPromoCheckbox() {
        return this.promoCheckbox;
    }

    get getAgeCheckbox() {
        return this.ageCheckbox;
    }

    get getCrossSaleCheckbox() {
        return this.crossSaleCheckbox
    }

    get getStateText() {
        return this.stateText;
    }

    get getPasswordTip() {
        return this.passwordTip
    }

    get getEmailInputError() {
        return this.emailInputError
    }
}