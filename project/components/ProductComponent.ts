import { Locator, Page } from "@playwright/test";

export class ProductComponent {
  readonly page: Page;
  readonly deerShirt: Locator;
  readonly elephantShirt: Locator;
  readonly giraffeShirt: Locator;
  readonly hedgehogShirt: Locator;
  readonly lionShirt: Locator;
  readonly tigerShirt: Locator;
  readonly priceDeer: Locator;
  readonly priceElephant: Locator;
  readonly priceGiraffe: Locator;
  readonly priceHedgehog: Locator;
  readonly priceLion: Locator;
  readonly priceTiger: Locator;
  readonly imgDeer: Locator;
  readonly imgElephant: Locator;
  readonly imgGiraffe: Locator;
  readonly imgHedgehog: Locator;
  readonly imgLion: Locator;
  readonly imgTiger: Locator;
  readonly sizeDeer: Locator;
  readonly colorDeer: Locator;
  readonly sizeElephan: Locator;
  readonly colorElephan: Locator;

  constructor(page: Page) {
    this.page = page;
    //products titles
    this.deerShirt = page.getByRole("link", { name: "Sacha the Deer" });
    this.elephantShirt = page.getByRole("link", {name: "Bumble the Elephant",});
    this.giraffeShirt = page.getByRole("link", { name: "Gerald the Giraffe" });
    this.hedgehogShirt = page.getByRole("link", { name: "Todd the Hedgehog" });
    this.lionShirt = page.getByRole("link", { name: "Scar the Lion" });
    this.tigerShirt = page.getByRole("link", { name: "Gavin the Tiger" });

    //products prices
    this.priceDeer = page
      .locator("li")
      .filter({ hasText: "Sacha the Deer Sacha’s" })
      .getByRole("paragraph")
      .nth(1);
    this.priceElephant = page
      .locator("li")
      .filter({ hasText: "Bumble the Elephant Bumble" })
      .getByRole("paragraph")
      .nth(1);
    this.priceGiraffe = page
      .locator("li")
      .filter({ hasText: "Gerald the Giraffe Gerald the" })
      .getByRole("paragraph")
      .nth(1);
    this.priceHedgehog = page
      .locator("li")
      .filter({ hasText: "Todd the Hedgehog Todd the" })
      .getByRole("paragraph")
      .nth(1);
    this.priceLion = page
      .locator("li")
      .filter({ hasText: "Scar the Lion Scar the lion" })
      .getByRole("paragraph")
      .nth(1);
    this.priceTiger = page
      .locator("li")
      .filter({ hasText: "Gavin the Tiger Gavin the" })
      .getByRole("paragraph")
      .nth(1);

    //products images

    this.imgDeer = page.locator(".styles").first();
    this.imgElephant = page.locator("li:nth-child(2) > .styles");
    this.imgGiraffe = page.locator("li:nth-child(3) > .styles");
    this.imgHedgehog = page.locator("li:nth-child(4) > .styles");
    this.imgLion = page.locator("li:nth-child(5) > .styles");
    this.imgTiger = page.locator("li:nth-child(6) > .styles");

    //size and colors of products
    this.sizeDeer = page.getByLabel("Size");
    this.colorDeer = page.getByLabel("Color");
    this.sizeElephan = page.getByLabel("Size");
    this.colorElephan = page.getByLabel("Color");
  }
}
