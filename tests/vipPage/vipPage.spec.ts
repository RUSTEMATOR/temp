import {test, expect, Locator} from "@playwright/test";
import VipPage from "../../src/PO/VipPage/VipPage";
import {LINKS} from "../../src/Data/Links/Links";
import {VIP_USERS} from "../../src/Data/Users/users";
import {VIP_TERMS_AND_CONDITIONS} from "../../src/Data/ExpectedTextResult/vipTermsAndConditions";
import playwrightConfig from "../../playwright.config";


test.use({viewport:
{ width: 1920, height: 1080 }});

for (const [status, creds] of Object.entries(VIP_USERS)) {
  test.describe.only(`Visual tests for ${status}`, () => {
    let vipPage: VipPage;

    test.beforeEach(async ({ page }) => {
      vipPage = new VipPage(page);
      await vipPage.navTo(LINKS.Vip)
      await vipPage.clickAcceptCookies()
      await vipPage.header.signIn(creds.email, creds.password);
    });

    test(`Current Status Image - ${status}`, async () => {
      await expect(vipPage.getCurrentStatusImage).toHaveScreenshot(`current-status-${status}.png`, {maxDiffPixels: 100, maxDiffPixelRatio: 1});
    });

    test(`VIP Page Logo - ${status}`, async () => {
        await expect(vipPage.getVipPageLogo).toHaveScreenshot(`vip-logo-${status}.png`, {maxDiffPixels: 100, maxDiffPixelRatio: 1})
    });

    test(`Card List - ${status}`, async () => {
      await expect(vipPage.getCardList).toHaveScreenshot(`card-list-${status}.png`, {maxDiffPixels: 100, maxDiffPixelRatio: 1})
    });

    if (status === 'guest') {
      console.log('Guest user, skipping VIP page logo screenshot');
    } else {
      test(`Page Level Logo - ${status}`, async () => {
        await expect(vipPage.getPageLevelLogo).toHaveScreenshot(`page-logo-${status}.png`, {maxDiffPixels: 100, maxDiffPixelRatio: 1})
      });
    }


    test('Check terms and conditions of the VIP page', async () => {
        expect(await vipPage.getTermsAndConditions.innerText()).toEqual(VIP_TERMS_AND_CONDITIONS)
    })
  });
}



test.describe.only(`Visual tests for anon`, () => {
  let vipPage: VipPage;

  test.beforeEach(async ({page}) => {
    vipPage = new VipPage(page);
    await vipPage.navTo(LINKS.Vip)
    await vipPage.clickAcceptCookies()
  });


  test('Check stepper - anon', async () => {
      await expect(vipPage.getVipPageStepper).toHaveScreenshot()
  })

})
