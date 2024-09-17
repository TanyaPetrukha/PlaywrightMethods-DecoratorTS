import { Locator, Page } from "@playwright/test";
import { ProductComponent } from "./ProductComponent";
import { step } from "../reporters/step_reporter";

export class CartComponent {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly incrementQuantityButton: Locator;
  readonly checkoutButton: Locator;
  private productName?: string;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
    this.incrementQuantityButton = page.getByLabel("Increment quantity");
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  @step("User adds T-shirt to the cart")
  async addToCart(productName: string) {
    this.productName = productName;
    await this.page.getByRole("link", { name: productName }).click();
    await this.addToCartButton.click();
  }

  @step("User sets T-shirt parameters")
  async shirtParameters(size: string, color: string) {
    const product = new ProductComponent(this.page);
    await this.page.locator("text=Size").waitFor();
    console.log(
      `Setting size to ${size} and color to ${color} for product ${this.productName}`
    );

    switch (this.productName) {
      case "Bumble the Elephant":
        await product.sizeElephan.selectOption({ label: size });
        await product.colorElephan.selectOption({ label: color });
        break;
      case "Sacha the Deer":
        await product.sizeDeer.selectOption({ label: size });
        await product.colorDeer.selectOption({ label: color });
        break;
      default:
        throw new Error(`Product ${this.productName} is in one size and color`);
    }
  }

  @step("The user increases the quantity of the t-shirts by one")
  async incrementQuantity() {
    await this.incrementQuantityButton.click();
  }

  @step("The user approves the purchase of a t-shirt in the cart")
  async checkout() {
    await this.checkoutButton.click();
  }
}
