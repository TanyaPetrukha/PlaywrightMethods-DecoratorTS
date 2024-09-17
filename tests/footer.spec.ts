import { test, expect } from "@playwright/test";
import { urls } from "../project/pages/urls";
import { MainPage } from "../project/pages/MainPage";
import { Footer } from "../project/components/Footer";

test.describe("Verify the user is able to see and interact with all Footer elements", () => {
  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.navigateToMainPage();
    await mainPage.scrollToFooter();
  });

  test(
    "footer has logo, sections, copyright",
    {
      annotation: {
        type: "Test with using test.step ",
        description: "Just wanted to compare all approaches",
      },
    },
    async ({ page }) => {
      const footer = new Footer(page);
      await test.step("User sees info about company", async () => {
        await expect(footer.companyInfo).toBeVisible();
      });
      await test.step("User sees General Section", async () => {
        await expect(footer.generalSection).toBeVisible();
      });

      await test.step("User sees Help Section", async () => {
        await expect(footer.helpSection).toBeVisible();
      });

      await test.step("User sees Contact Section", async () => {
        await expect(footer.contactUsSection).toBeVisible();
      });
      await test.step("User sees Copyrights", async () => {
        await expect(footer.copyrights).toBeVisible();
      });
    }
  );

  test("General section has navigation", async ({ page }) => {
    const footer = new Footer(page);

    await expect(footer.productsInGeneral).toBeVisible();
    await expect(footer.ourStoryInGeneral).toBeVisible();
    await expect(footer.contactInGeneral).toBeVisible();
  });

  test("Help section has navigation", async ({ page }) => {
    const footer = new Footer(page);

    await expect(footer.shippingInHelp).toBeVisible();
    await expect(footer.returnsInHelp).toBeVisible();
  });

  test("Contact section has navigation", async ({ page }) => {
    const footer = new Footer(page);

    await expect(footer.getInTouch).toBeVisible();
    await expect(footer.emailInContact).toBeVisible();
    await expect(footer.phoneInContact).toBeVisible();
    await expect(footer.youtubeInContact).toBeVisible();
    await expect(footer.linkedinInContact).toBeVisible();
    await expect(footer.instagramInContact).toBeVisible();
  });

  test("links in Help section", async ({ page }) => {
    const footer = new Footer(page);

    await footer.clickOnShipping();
    await expect(page).toHaveURL(urls.shipping);

    await footer.clickOnReturns();
    await expect(page).toHaveURL(urls.returns);
  });

  test("links in General section", async ({ page }) => {
    const footer = new Footer(page);

    await footer.clickOnProducts();
    await expect(page).toHaveURL(urls.products);

    await footer.clickOnOurStory();
    await expect(page).toHaveURL(urls.ourStory);

    await footer.clickOnContact();
    await expect(page).toHaveURL(urls.contact);
  });

  test("links in Contact section", async ({ page }) => {
    const footer = new Footer(page);

    await footer.clickOnGetInTouch();
    await expect(page).toHaveURL(/.*contact/);
    await page.goBack();

    await footer.clickOnYoutube();
    await expect(page).toHaveURL(/.*youtube/);
    await page.goBack();

    await footer.clickOnLinkedin();
    await expect(page).toHaveURL(/.*linkedin/);
    await page.goBack();

    await footer.clickOnInstagram();
    await expect(page).toHaveURL(/.*instagram/);
    await page.goBack();
  });

  test("footer has correct copyright text with current year", async ({
    page,
  }) => {
    const footer = new Footer(page);
    const copyrightText = await footer.copyrights.textContent();
    const currentYear = new Date().getFullYear();

    expect(copyrightText).toContain(
      `All Rights Reserved © ${currentYear} Fur, Inc. Template by CloudCannon`
    );
  });
});
