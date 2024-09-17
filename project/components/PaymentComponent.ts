import { expect, Locator, Page } from "@playwright/test";
import { step } from "../reporters/step_reporter";

export class PaymentComponent {
  readonly page: Page;
  readonly paymentForm: Locator;
  readonly inputName: Locator;
  readonly inputEmail: Locator;
  readonly inputAdress: Locator;
  readonly inputApt: Locator;
  readonly inputCity: Locator;
  readonly selectCountry: Locator;
  readonly selectState: Locator;
  readonly inputZIP: Locator;
  readonly continueToPayment: Locator;
  readonly inputCardNumber: Locator;
  readonly inputMM_YY: Locator;
  readonly inputCVV: Locator;
  readonly placeOrder: Locator;
  readonly orderSuccessMessage: Locator;

  constructor(page) {
    this.page = page;
    this.paymentForm = page.getByRole("heading", { name: "Billing" });

    //billing form1
    this.inputName = page.getByLabel("Full name");
    this.inputEmail = page.getByLabel("Email");
    this.inputAdress = page.getByLabel("Street address");
    this.inputApt = page.getByLabel("Apt/Suite");
    this.inputCity = page.getByLabel("City");
    this.selectCountry = page.getByLabel("Country");
    this.selectState = page.getByLabel("Province/State");
    this.inputZIP = page.getByLabel("Postal/ZIP code");
    this.continueToPayment = page.getByRole("button", {
      name: "Continue to payment",
    });

    //card details form
    this.inputCardNumber = page
      .frameLocator("iframe")
      .getByPlaceholder("Card number");
    this.inputMM_YY = page.frameLocator("iframe").getByPlaceholder("MM/YY");
    this.inputCVV = page.frameLocator("iframe").getByPlaceholder("CVV");
    this.placeOrder = page.getByRole("button", { name: "Place order" });

    // successful form
    this.orderSuccessMessage = page.getByRole("heading", {
      name: "Thank you for your order",
    });
  }

  @step("User fills all fields in the Billing Form")
  async fillBillingForm(name, email, adress, apt, city, country, state, zip) {
    await this.inputName.fill(name);
    await this.inputEmail.fill(email);
    await this.inputAdress.fill(adress);
    await this.inputApt.fill(apt);
    await this.inputCity.fill(city);
    await this.selectCountry.click();
    await this.page.getByText(country).click();
    await this.selectState.click();
    await this.page.getByText(state).click();
    await this.inputZIP.fill(zip);
  }

  @step("User checks entered data and submit the Billing form")
  async submitBillingForm() {
    await this.continueToPayment.click();
  }

  @step("User enters card details")
  async fillCardDetails(card_number, mmyy, cvv) {
    await this.inputCardNumber.click();
    await this.inputCardNumber.fill(card_number);
    await this.inputMM_YY.click();
    await this.inputMM_YY.fill(mmyy);
    await this.inputCVV.click();
    await this.inputCVV.fill(cvv);
  }

  @step("User checks entered data and submit the Card details form")
  async submitCardDetailsForm() {
    await this.placeOrder.click();
  }

  @step("User sees message that the order is created")
  async verifyOrderSuccessMessage() {
    await expect(this.orderSuccessMessage).toBeVisible({ timeout: 10000 });
  }
}
