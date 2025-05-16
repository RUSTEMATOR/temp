import {Locator} from "@playwright/test";

export interface IGameCategories {
    [key: string]: {
        locator: Locator;
        title: string
    }
}