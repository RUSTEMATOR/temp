import BaseComponent from "./BaseComponent";
import {Locator, Page} from "@playwright/test";
import SignInModal from "../PO/MainPage/Component/SignInModal";
import SignUpModal from "../PO/MainPage/Component/SignUpModal";
import {DepModal} from "./DepModal";


export default class Header extends BaseComponent {
    private burgerMenuOpenButton: Locator
    private headerLogo: Locator
    private search: Locator
    private searchField: Locator
    private createAccountButton: Locator
    private signInButton: Locator
    private langDropdown: Locator
    private filterButton: Locator
    private depositButton: Locator
    private gameItem: Locator
    private currenciesDropdown: Locator

    private filterProviderButton: Locator
    private filterCategoriesButton: Locator

    private langDropdownItem: (language: string) => Locator



    constructor(page: Page) {
        super(page);

        this.burgerMenuOpenButton = page.locator('#burger_menu_btn')
        this.headerLogo = page.locator('.header__logo--desktop')
        this.search = page.locator('.header__input-search')
        this.searchField = page.locator('#header_search_input')
        this.createAccountButton = page.locator('#header_create_acc_btn')
        this.signInButton = page.locator('#header_log_in_btn')
        this.langDropdown = page.locator('#lang_dropdown')
        this.filterButton = page.locator('#filter_btn')
        this.depositButton = page.locator('#header_dep_btn')
        this.gameItem = page.locator('.select-games-search-for-grid__option-link')
        this.currenciesDropdown = page.locator('#header_currency_dropdown')

        this.filterProviderButton = page.locator('.games-search-filter-block__header').filter({ hasText: /^Provider$/ })
        this.filterCategoriesButton = page.locator('.games-search-filter-block__header').filter({ hasText: /^Category$/ })

        this.langDropdownItem = (language: string) => page.locator('.select-language-icons-with-code__link').filter({hasText: language})
    }

    async openBurgerMenu(): Promise<void> {
        await this.burgerMenuOpenButton.click()
    }

    async clickHeaderLogo(): Promise<void> {
        await this.headerLogo.click()
    }

    async searchFor(searchTerm: string): Promise<void> {
        await this.search.click()
        await this.searchField.fill(searchTerm)
    }

    async clickCreateAccount(): Promise<SignUpModal> {
        await this.createAccountButton.click()
        return new SignUpModal(this.page)
    }

    async clickSignIn(): Promise<SignInModal> {
        await this.signInButton.click()
        return new SignInModal(this.page)
    }

    async signIn(email: string, password: string): Promise<void> {
        const signInModal = await this.clickSignIn()
        await signInModal.fillEmail(email)
        await signInModal.fillPassword(password)
        await signInModal.clickSignIn()
        await signInModal.page.waitForTimeout(8000)
    }

    async openLangDropdown(): Promise<void> {
        await this.langDropdown.click()
    }

    async changeLanguageTo(language: string): Promise<void> {
        await this.openLangDropdown()
        await this.langDropdownItem(language).click()
    }

    async clickFilterButton(): Promise<void> {
        await this.filterButton.click()
    }

    async clickFilterProviderButton(): Promise<void> {
        await this.filterProviderButton.click()
    }

    async clickFilterCategoriesButton(): Promise<void> {
        await this.filterCategoriesButton.click()
    }

    async getListOfFilterProviders(): Promise<Array<string>>{

        return await this.page.evaluate(() => {
            const filterProviders = document.querySelectorAll('.games-search-filter-block__header--active + div.collapse.collapse--entered  .games-search-filter-item ');
            if (!filterProviders){
                throw new Error('Providers not found in the filter, something went wrong, better debug')
            }

            const arrayOfHTML = Array.from(filterProviders)

            const textArray:Array<string> = []

            for (let element of arrayOfHTML){
                const text = (element as HTMLElement).innerText
                textArray.push(text)
            }
            return textArray
        })
    }

    async getListOfFilterCategories(): Promise<Array<string>> {
        return await this.page.evaluate(() => {
            const filterCategories = document.querySelectorAll('.games-search-filter-block__header--active + div.collapse.collapse--entered .games-search-filter-block__values .games-search-filter-item');
                if (!filterCategories){
                    throw new Error('Providers not found in the filter, something went wrong, better debug')
                }

                const arrayOfHTML = Array.from(filterCategories)

                const textArray:Array<string> = []

                for (let element of arrayOfHTML){
                    const text = (element as HTMLElement).innerText
                    textArray.push(text)
                }
                return textArray
        })
    }

    async clickDepositButton(): Promise<DepModal> {
        await this.depositButton.click()
        return new DepModal(this.page)
    }

    async clickOnGameItem(){
        await this.gameItem.hover()
        await this.gameItem.click()
    }

    async openCurrenciesDropdown(){
        await this.currenciesDropdown.click()
    }

    async getLangDropdownLocales(){
        return await this.page.evaluate(() => {

            const dropdownList = document.querySelector('#lang_dropdown')
            const dropdownButton = document.querySelector('#lang_dropdown-menu')

            const aText = (dropdownButton as HTMLElement).innerText

            const bText = (dropdownList as HTMLElement).innerText

            const allText = `${bText}\n ${aText}`

            return allText.split('\n').map(code => code.trim())
        })
    }

    async getCurrencies(){
        return await this.page.evaluate(() => {
            const currencyNodes = document.querySelectorAll('.balance-select__dropdown > [role= "option"] > span')

            const array = []

            for (let element of currencyNodes){

                const text = (element as HTMLElement).innerText

                array.push(text)
            }

            return array
        })
    }

    get getDepositButton(): Locator {
        return this.depositButton
    }

    get getCreateAccountButton(): Locator {
        return this.createAccountButton
    }

    get getSignInButton(): Locator {
        return this.signInButton
    }
}

