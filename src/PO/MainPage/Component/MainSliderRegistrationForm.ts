import BaseComponent from "../../../Components/BaseComponent";
import {Locator, Page} from "@playwright/test";

export default class MainSliderRegistrationForm extends BaseComponent {
    private mainSliderRegistrationForm: Page
    private emailInput: Locator
    private passwordInput: Locator
    private countryDropdown: Locator
    private countryDropdownItem: (country: string) => Locator
    private currencyDropdown: Locator
    private currencyDropdownItem: (currency: string) => Locator
    private promoCheckbox: Locator
    private ageCheckbox: Locator
    private crossSaleCheckbox: Locator
    private createAccountButton: Locator
    private signInLink: Locator


    constructor(page: Page) {
        super(page);

        this.mainSliderRegistrationForm = page

        this.emailInput = page.locator('#main_email_input')
        this.passwordInput = page.locator('#main_password_input')
        this.countryDropdown = page.locator('.registration-form-nomodal__country-select')
        this.countryDropdownItem = (country: string) => page.locator('#main_country_dropdown-menu .select__option').filter({hasText: country})
        this.currencyDropdown = page.locator('.registration-form-nomodal__currency-select')
        this.currencyDropdownItem = (currency: string) => page.locator('.registration-form-nomodal__currency-select .select__option').filter({hasText: currency})
        this.promoCheckbox = page.locator('#promos_checkbox')
        this.ageCheckbox = page.locator('#age_checkbox')
        this.crossSaleCheckbox = page.locator('#cross_sale_checkbox')
        this.createAccountButton = page.locator('#main_create_acc_btn')
        this.signInLink = page.locator('.registration-form-nomodal__link')
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

    async clickCreateAccount(): Promise<void> {
        await this.createAccountButton.click()
    }

    async clickSignInLink(): Promise<void> {
        await this.signInLink.click()
    }
}

