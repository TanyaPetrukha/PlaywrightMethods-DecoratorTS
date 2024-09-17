import { test } from "@playwright/test";
import { MainPage } from "../project/pages/MainPage";
import { CartComponent } from "../project/components/CartComponent";
import { PaymentComponent } from "../project/components/PaymentComponent";

let mainPage: MainPage;
let cart: CartComponent;
let payment: PaymentComponent;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  cart = new CartComponent(page);
  payment = new PaymentComponent(page);
  await mainPage.navigateToMainPage();
  await mainPage.verifyMainPageOpened();
});

test.afterEach(async ({ page }) => {
  console.log(
    `Finished ${test.info().title} with status ${test.info().status}`
  );

  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test(
  'Buy "Bumble the Elephant" T-shirt - check that order was created',
  {
    annotation: {
      type: "Test with decorators",
      description: "Just wanted to compare all approaches",
    },
  },
  async () => {
    await cart.addToCart("Bumble the Elephant");
    await cart.shirtParameters("Small", "Green");
    await cart.incrementQuantity();
    await cart.checkout();
    await payment.fillBillingForm(
      "Tanya",
      "tanya@gmail.com",
      "Holly Trail",
      "17",
      "City",
      "Canada",
      "Ontario",
      "23927"
    );
    await payment.submitBillingForm();

    await payment.fillCardDetails("4242 4242 4242 42424", "08/26", "123");
    await payment.submitCardDetailsForm();

    await payment.verifyOrderSuccessMessage();
  }
);

test(
  'Buy "Sacha the Deer" T-shirt - check that order was created',
  {
    tag: "@smoke",
  },
  async () => {
    await cart.addToCart("Sacha the Deer");
    await cart.shirtParameters("Medium", "Black");
    await cart.incrementQuantity();
    await cart.checkout();

    await payment.fillBillingForm(
      "Amy Weissnat",
      "amy.weissnat@gmail.com",
      "Just Street",
      "99",
      "Kingstown",
      "United States",
      "Alabama",
      "98714"
    );

    await payment.submitBillingForm();

    await payment.fillCardDetails("4242 4242 4242 42424", "08/26", "123");
    await payment.submitCardDetailsForm();

    await payment.verifyOrderSuccessMessage();
  }
);
