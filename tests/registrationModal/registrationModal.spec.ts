import test, {expect} from '@playwright/test'
import MainPage from "../../src/PO/MainPage/MainPage";
import {LINKS} from "../../src/Data/Links/Links";
import {LIST_OF_CURRENCIES} from "../../src/Data/Constants/Currencies";
import SignUpModal from "../../src/PO/MainPage/Component/SignUpModal";
import {MAIN_USER} from "../../src/Data/Users/mainUser";
import {PASSWORD_STATES} from "../../src/Data/ParametrizedData/passwords/passwords";
import {COUNTRIES} from "../../src/Data/Constants/countries";
import playwrightConfig from "../../playwright.config";
import TermsAndConditions from "../../src/PO/TermsAndConditions/TermsAndConditions";
import {NEGATIVE_EMAILS} from "../../src/Data/ParametrizedData/negativeEmails/negativeEmails";
import Methods from "../../src/Methods/Methods";




test.describe('Registration Modal', () => {
    let mainPage: MainPage;
    let methods: Methods;
    let signUpModal: SignUpModal;
    let termsAndConditions: TermsAndConditions;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        methods = new Methods();
        termsAndConditions = new TermsAndConditions(page);

        await mainPage.navTo(LINKS.Main);
        await mainPage.clickAcceptCookies();

        signUpModal = await mainPage.header.clickCreateAccount();
        await mainPage.waitForSelector(signUpModal.getEmailInput);
    });

    test('Check "Currency" dropdown', async () => {
        await test.step('Check "Currency" dropdown', async () => {
            const currencies = await signUpModal.getCurrenciesFromDropdown();
            expect(currencies).toEqual(LIST_OF_CURRENCIES);
        });
    });

    test('Check "Create account" button availability', async () => {
        await test.step('Check that registration modal is visible', async () => {
            expect(await signUpModal.getSignUpModal.isVisible()).toBe(true);
        });
    });

    test('Check "Already have an account. Sign in" button', async () => {
        await test.step('Check "Already have an account. Sign in" link', async () => {
            let signInModalForm = await signUpModal.clickSignInLink();
            await signInModalForm.getSignInModalForm.waitFor({ state: "visible" });
            expect(await signInModalForm.getSignInModalForm.isVisible()).toBe(true);
        });
    });

    test('Check "Email" field in the registration modal form', async () => {
        await test.step('Enter a valid email into the "Email" input', async () => {
            await signUpModal.fillEmail('samoilenkofluttershy@gmail.com');
            await expect(signUpModal.getEmailInput).toHaveAttribute('value', MAIN_USER.email);
        });
    });

    test('Check "Password" field in the registration modal form', async () => {
        await test.step('Enter a valid password into the "Password" input', async () => {
            await signUpModal.fillPassword('193786Az()');
            await expect(signUpModal.getPasswordInput).toHaveAttribute('value', MAIN_USER.password);
        });
    });

    for (const [state, values] of Object.entries(PASSWORD_STATES)) {
        test(`Check password field states: ${state}`, async () => {
            await test.step(`Enter ${state} password`, async () => {
                await signUpModal.fillPassword(values.password);
                await mainPage.sleep(1000);
            });

            await test.step(`Check color of the state bar of ${state} password`, async () => {
                expect.soft(signUpModal.getPasswordStateBar).toHaveCSS('background-color', values.color);
            });

            await test.step(`Check the state message: ${state}`, async () => {
                expect.soft(await signUpModal.getPassowrdStateText()).toEqual(values.text);
            });
        });
    }

    test('Check country dropdown in the registration modal form', async () => {
        await test.step('Click on the "Country" dropdown', async () => {
            const countries = await signUpModal.getCountriesFromDropdown();
            expect(countries).toEqual(COUNTRIES);
        });
    });

    test('Check "I want to receive exclusive offers" checkbox', async () => {
        await test.step('Click on the checkbox', async () => {
            await signUpModal.checkPromoCheckbox();
            await expect(signUpModal.getPromoCheckbox).toBeChecked();
        });
    });

    test('Check "I am 18 years old or older..." checkbox', async () => {
        await test.step('Click on the checkbox', async () => {
            await signUpModal.checkAgeCheckbox();
            await expect(signUpModal.getAgeCheckbox).toBeChecked();
        });
    });

    test('Check cross promo checkbox', async () => {
        await test.step('Click on the cross promo checkbox', async () => {
            await signUpModal.checkCrossSaleCheckbox();
            await expect(signUpModal.getCrossSaleCheckbox).toBeChecked();
        });
    });

    test('Check "Terms and conditions" link', async () => {
        await test.step('Click on the "Terms and conditions" link', async () => {
            await signUpModal.clickOnTermsAndConditionsLink();
            expect.soft(await termsAndConditions.getPageUrl()).toEqual(`${playwrightConfig.use?.baseURL}${LINKS.TermsAndConditions}`);
            await expect.soft(termsAndConditions.getDownloadPdfButton).toBeVisible();
        });
    });

    for (let params of Object.values(NEGATIVE_EMAILS)) {
        test(`[Negative] Check 17 restricted email formats, ${params.email}`, async () => {
            await test.step(`Enter invalid email ${params.email}`, async () => {
                await signUpModal.fillEmail(params.email);
                await signUpModal.getEmailInput.blur();
            });

            await test.step('Check error of the input field', async () => {
                await expect.soft(signUpModal.getEmailInputError).toBeVisible();
                await expect.soft(signUpModal.getEmailInputError).toHaveText(params.error);
            });
        });
    }

    test('Check Registration and Post reg pop-up modal', async () => {
        const email = await methods.generateRandomEmail(3);

        await test.step('Create an account', async () => {
            await signUpModal.createAccount({ email: email, password: MAIN_USER.password });
        });

        await test.step('Check post-reg pop-up', async () => {
            await mainPage.waitForSelector(mainPage.getSuccessRegPopUp);
            expect.soft(mainPage.getSuccessRegPopUp).toBeVisible()
        })

        await test.step('Click on deposit and play button', async () => {
            const depModal = await mainPage.clickOnDepositAndPlayPostReg();

            expect.soft(await mainPage.getPageUrl()).toEqual(`${playwrightConfig.use?.baseURL}${LINKS.MainPageDepModal}`);
            await expect.soft(depModal.getDepModal).toBeVisible();
        })
    });
});
