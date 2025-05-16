import {Page, Locator} from "@playwright/test";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import SidebarMenu from "../../Components/SidebarMenu";
import CategoryDropdown from "../MainPage/Component/CategoryDropdown";

export default class BasePage {
  readonly page: Page
  public header: Header
  public footer: Footer
  public sideBarMenu: SidebarMenu
  private acceptCookiesButton: Locator
  readonly scrollUpButton: Locator
  public categoryDropdown: CategoryDropdown

  constructor(page: Page) {
    this.page = page;

    this.scrollUpButton = this.page.locator('.btn-scroll-top')
    this.acceptCookiesButton = this.page.locator('#accept_initial_notification_button')

    this.header = new Header(this.page)
    this.footer = new Footer(this.page)
    this.sideBarMenu = new SidebarMenu(this.page)
    this.categoryDropdown = new CategoryDropdown(this.page)
  }

  async navTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async sleep(miliseconds: number): Promise<void> {
    await this.page.waitForTimeout(miliseconds);
  }

  async getPageUrl(): Promise<string>{
    return this.page.url()
  }

  async scrollTo(locator: Locator): Promise<void>{
    await locator.scrollIntoViewIfNeeded()
  }

  async clickAcceptCookies(): Promise<void>{
    await this.acceptCookiesButton.click()
  }

  async waitForSelector(locator: Locator): Promise<void>{
    await locator.waitFor({state: "visible"})
  }

  get getScrollUpButton(): Locator {
    return this.scrollUpButton
  }
}