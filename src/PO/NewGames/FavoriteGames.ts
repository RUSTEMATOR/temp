import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage/BasePage";

export default class FavoriteGames extends BasePage {
    private favoriteGamesButton: Locator
    private favoriteGameItem: Locator
    private favoriteGamePageButton: Locator


    constructor(page: Page){
        super(page)

        this.favoriteGamesButton = page.locator('.catalog__item:nth-of-type(1) .game__favorite')
        this.favoriteGameItem = page.locator('.favorite-games__item')
        this.favoriteGamePageButton = page.locator('.favorite-games__item .game__favorite')
    }


    async clickOnFavoriteButton(): Promise<void>{
        await this.favoriteGamesButton.click()
    }

    async clickOnFavoritePageGameButton(): Promise<void>{
        await this.favoriteGamePageButton.click()
    }

    get getFavoriteGameItem(): Locator {
        return this.favoriteGameItem
    }
}