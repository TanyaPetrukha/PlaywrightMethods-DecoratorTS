import { expect, Locator, Page } from "@playwright/test";
import { step } from "../reporters/step_reporter";

export class MainPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly subHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      name: "Find your spirit animal",
    });
    this.subHeading = page.getByText("The animal friendly clothing");
  }

  @step("User is on the Main page")
  async navigateToMainPage() {
    await this.page.goto(
      "https://ilarionhalushka.github.io/jekyll-ecommerce-demo/"
    );
  }

  @step("User sees Heading and Subheading of the Main page")
  async verifyMainPageOpened() {
    await expect(this.heading).toBeVisible();
    await expect(this.subHeading).toBeVisible();
  }

  async scrollToFooter() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
  }
}
