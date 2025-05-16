import BaseComponent from "../../../Components/BaseComponent";
import {Locator, Page} from "@playwright/test";
import SignInModal from "./SignInModal";
import PromoPage from "../../PromoPage/PromoPage";


export default class SignUpFormSlider extends BaseComponent{
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
    private passwordStateBar: Locator
    private stateText: Locator
    private passwordTip: Locator
    private termsAndConditionsLink: Locator
    private emailInputError: Locator
    private discoverMoreButton: Locator

    constructor(page: Page) {
        super(page);

        this.emailInput = page.locator('#main_email_input')
        this.passwordInput = page.locator('#main_password_input')
        this.countryDropdown = page.locator('#main_country_dropdown')
        this.countryDropdownItem = (country: string) => page.locator('#reg_modal_country_dropdown-menu .select__option').filter({hasText: country})
        this.currencyDropdown = page.locator('#main_currency_dropdown')
        this.currencyDropdownItem = (currency: string) => page.locator('#main_currency_dropdown .select__option').filter({hasText: currency})
        this.promoCheckbox = page.locator('[for=\'promos_checkbox\'] > .checkbox__point')
        this.ageCheckbox = page.locator('[for=\'age_checkbox\'] > .checkbox__point')
        this.crossSaleCheckbox = page.locator('[for=\'cross_sale_checkbox\'] .checkbox__point')
        this.creacteAccountButton = page.locator('#main_create_acc_btn')
        this.signInLink = page.locator('.registration-form-nomodal__link')
        this.passwordStateBar = page.locator('.password-input__strength-progress')
        this.stateText = page.locator('.password-input__strength-description')
        this.passwordTip = page.locator('.form-element__error')
        this.termsAndConditionsLink = page.locator('a.terms-acceptance__terms-link')
        this.emailInputError = page.locator('.form-element__error')
        this.discoverMoreButton = page.locator('.registration-form-nomodal__col--promo #discover_more_btn')
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

    async clickOnDiscoverMore(): Promise<PromoPage> {
        await this.discoverMoreButton.click()
        return new PromoPage(this.page)
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