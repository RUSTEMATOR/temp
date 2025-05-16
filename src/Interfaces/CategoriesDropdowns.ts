import {Locator, Page} from "@playwright/test";

export interface ICategoriesDropdowns {
    [key: string]: {
        locator: string;
        expectedResult: Array<string>;
    };
}


