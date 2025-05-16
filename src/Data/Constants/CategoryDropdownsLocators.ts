import {ICategoriesDropdowns} from "../../Interfaces/CategoriesDropdowns";

export const CATEGORY_DROPDOWN_PARAMS: ICategoriesDropdowns = {
        Slots: {
                locator: '#slots_category + .game-category-helper__btn',
                expectedResult: ['Accumulating', 'Bonus buy', 'Megaways', 'Crash', 'Book', 'Exclusive']
        },
        Live: {
                locator: '#live_category + .game-category-helper__btn',
                expectedResult: ['Live blackjack', 'Live roulette', 'Live baccarat', 'Live poker']
        },
        Table: {
                locator: '#table_games_category +.game-category-helper__btn',
                expectedResult: ['Online roulette', 'Online blackjack', 'Online baccarat']
        },
}