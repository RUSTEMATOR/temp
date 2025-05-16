import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class GamePage extends BasePage {
    private gameFrame: Locator;
    private sideBarPanel: Locator;
    private sideNewGame: Locator;
    private sideRecentGames: Locator;
    private sideFavoriteGames: Locator;
    private sideTopGames: Locator;
    private sideLastGames: Locator;
    private sideTournaments: Locator;
    private sideSupport: Locator;
    private searchButton: Locator;
    private searchInput: Locator;
    private gameButton: Locator;
    private confirmButton: Locator;
    private twoScreensButton: Locator;
    private gameWindow: Locator;
    private fourScreensButton: Locator;
    private sidebarCurrencyDropdown: Locator;
    private gameCurrencyList: Locator;
    private tournamentButton: Locator;
    private sidebarTournament: Locator;
    private ingameCurrency: (text: string) => Locator;

    constructor(page: Page) {
        super(page);

        this.gameFrame = page.locator('.game-frame__frame')
        this.sideBarPanel = page.locator('.game-panel')
        this.sideNewGame = page.locator('#game_side_new')
        this.sideRecentGames = page.locator('#game_side_recently')
        this.sideFavoriteGames = page.locator('#game_side_fav')
        this.sideTopGames = page.locator('#game_side_fav')
        this.sideLastGames = page.locator('#game_side_last')
        this.sideTournaments = page.locator('#game-side-tournament')
        this.sideSupport = page.locator('#game_side_support')
        this.searchButton = page.locator('.game-panel__button-search')
        this.searchInput = page.locator('#games-search')
        this.gameButton = page.locator('#games-search-item-0')
        this.confirmButton = page.locator('.game-session-close-modal__buttons .btn--primary')
        this.twoScreensButton = page.locator('.game-controls__button--screen-2')
        this.fourScreensButton = page.locator('.game-controls__button--screen-4')
        this.gameWindow = page.locator('.page-game__grid-item')
        this.sidebarCurrencyDropdown = page.locator('#game-currency-select')
        this.gameCurrencyList = page.locator('.game-currency__list')
        this.tournamentButton = page.locator('#game-side-tournament')
        this.sidebarTournament = page.locator('.game-tourn')
        this.ingameCurrency = (text: string) => page.locator('.game-currency__code').filter({hasText: text})
    }


    async triggerSideBarMenu() {
        await this.sideBarPanel.hover()
    }

    async clickOnSearchButton() {
        await this.searchButton.click()
    }

    async searchForAGame(text: string) {
        await this.searchInput.fill(text)
    }

    async clickOnGame() {
        await this.gameButton.click()
    }

    async openSecondGameWindow(){
        await this.twoScreensButton.click()
    }

    async openFourGameWindow(){
        await this.fourScreensButton.click()
    }

    async clickOnConfirm() {
        await this.confirmButton.click()
    }

    async openCurrencyDropdown(){
        await this.sidebarCurrencyDropdown.click()
    }

    async selectIngameCurrency(text: string){
        await this.ingameCurrency(text).click()
    }

    async clickOnTournamentButton() {
        await this.tournamentButton.click()
    }



    get getGameFrame(): Locator {
        return this.gameFrame;
    }

    get getSideBarPanel(): Locator {
        return this.sideBarPanel;
    }

    get getGameWindow(): Locator {
        return this.gameWindow;
    }

    get getSidebarCurrencyDropdown(): Locator {
        return this.sidebarCurrencyDropdown;
    }

    get getGameCurrencyList(): Locator {
        return this.gameCurrencyList;
    }

    get getSidebarTournament(): Locator {
        return this.sidebarTournament;
    }

    get sideBarButtons(): Array<Locator> {
        return [
            this.sideNewGame,
            this.sideRecentGames,
            this.sideFavoriteGames,
            this.sideTopGames,
            this.sideLastGames,
            this.sideTournaments,
            this.sideSupport
        ]
    }
}