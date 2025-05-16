import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class TournamentPage extends BasePage {
    private tournamentItem: Locator


    constructor(page: Page) {
        super(page);

        this.tournamentItem = page.locator('.tourn-item:nth-of-type(1)')
    }


    get getTournamentItem(): Locator {
        return this.tournamentItem;
    }
}