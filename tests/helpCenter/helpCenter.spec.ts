import test, { expect } from "@playwright/test";
import CasinoFaq from "../../src/PO/CasinoFaq/CasinoFaq";
import { LINKS } from "../../src/Data/Links/Links";
import { FAQText } from "../../src/Data/ExpectedTextResult/FAQText";
import CasinoDictionary from "../../src/PO/CasinoDictionary/CasinoDictionary";
import { CasinoDictionaryText } from "../../src/Data/ExpectedTextResult/casinoDictionaryText";
import CryptoFaq from "../../src/PO/CryptoFaq/CryptoFaq";
import {CRYPTO_FAQ_TEXT} from "../../src/Data/ExpectedTextResult/cryptoFAQText";
import Complaints from "../../src/PO/Complaints/Complaints";
import {COMPLAINTS_TEXT} from "../../src/Data/ExpectedTextResult/complaintsText";
import TermsAndConditions from "../../src/PO/TermsAndConditions/TermsAndConditions";
import {TERMS_AND_CONDITIONS_TEXT} from "../../src/Data/ExpectedTextResult/termsAndCondition";
import BonusTermsAndConditions from "../../src/PO/BonusTermsAndConditions/BonusTermsAndConditions";
import {BONUS_TERMS_AND_CONDITIONS} from "../../src/Data/ExpectedTextResult/bonusTermsAndConditionsText";
import PrivacyPolicy from "../../src/PO/PrivacyPolicy/PrivacyPolicy";
import {PRIVACY_POLICY_TEXT} from "../../src/Data/ExpectedTextResult/privacyPolicyText";
import {RESPONSIBLE_GAMBLING_TEXT} from "../../src/Data/ExpectedTextResult/responsibleGamblingText";
import SupportPage from "../../src/PO/SupportPage/SupportPage";


test.describe("Help Center", () => {
    let casinoFaq: CasinoFaq
    let casinoDictionary: CasinoDictionary
    let cryptoFaqPage: CryptoFaq
    let complaintsPage: Complaints
    let privacyPolicy: PrivacyPolicy
    let termsAndConditionsPage: TermsAndConditions
    let bonusTermsAndConditions: BonusTermsAndConditions

    test('Check FAQ', async ({page}) => {
        casinoFaq = new CasinoFaq(page)

        await casinoFaq.navTo(LINKS.faqLink)
        expect(await casinoFaq.getBodyText()).toEqual(FAQText)
    })

    test('Check Casino Dictionary', async ({page}) => {
        casinoDictionary = new CasinoDictionary(page)

        await casinoDictionary.navTo(LINKS.casinoDictionary)
        expect(await casinoDictionary.getBodyText()).toEqual(CasinoDictionaryText)
    })

    test('Check "Crypto Currencies FAQ"', async ({page}) => {
        cryptoFaqPage = new CryptoFaq(page)

        await cryptoFaqPage.navTo(LINKS.cryptoFaq)
        expect(await cryptoFaqPage.getCollapseBlocksText()).toEqual(CRYPTO_FAQ_TEXT)
    })

    test('Check "Complaints"', async ({page}) => {
        complaintsPage = new Complaints(page)

        await complaintsPage.navTo(LINKS.complaints)


        expect(await complaintsPage.getComplaintsInfoText()).toEqual(COMPLAINTS_TEXT)
    })

    test('Check Terms and Conditions', async ({page}) => {
        termsAndConditionsPage = new TermsAndConditions(page)

        await termsAndConditionsPage.navTo(LINKS.TermsAndConditions)
        expect(await termsAndConditionsPage.getCollapseDropdownText()).toEqual(TERMS_AND_CONDITIONS_TEXT)
    })

    test('Check "Bonus T&C"', async ({page}) => {
        bonusTermsAndConditions = new BonusTermsAndConditions(page)

        await bonusTermsAndConditions.navTo(LINKS.bonusTermsAndConditions)
        expect(await bonusTermsAndConditions.getInfoBlockText()).toEqual(BONUS_TERMS_AND_CONDITIONS)
    })

    test('Check Privacy policy', async ({page}) => {
        privacyPolicy = new PrivacyPolicy(page)

        await privacyPolicy.navTo(LINKS.privacyPolicy)
        expect(await privacyPolicy.getPrivacyPolicyText()).toEqual(PRIVACY_POLICY_TEXT)
    })

    test('Check Responsible gambling', async ({page}) => {
        privacyPolicy = new PrivacyPolicy(page)

        await privacyPolicy.navTo(LINKS.responsibleGambling)
        expect(await privacyPolicy.getPrivacyPolicyText()).toEqual(RESPONSIBLE_GAMBLING_TEXT)
    })

    test('Check Support', async ({page}) => {
        const supportPage = new SupportPage(page)

        await supportPage.navTo(LINKS.support)
        await expect(supportPage.SupportBlock).toHaveScreenshot({ maxDiffPixels: 100 })
    })
})