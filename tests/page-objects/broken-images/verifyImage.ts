import {
  page,
  addData,
  Utilities,
  locators,
  dynamic_locators,
  SelfHealingLocator,
} from "../common/commonImports";

const utility = new Utilities();

export class verifyImage {
  async navigationToBrokenImages() {
    const elementButton = new SelfHealingLocator(locators.elementButton);
    await elementButton.click();
    await page.click(locators.brokenImage);
  }

  async validateBrokenImage() {
    try {
      // Find the image element
      const imageElement = await page.locator(
        "(//div[contains(@class,'col-12 mt-4')]//img)[2]"
      );
      // Get the "src" attribute of the image
      const actualBrokenLink = await imageElement.getAttribute("src");
      const expectedBrokenLink = "/images/Toolsqa_1.jpg";
      const titleBrokwnLink = "Broken Image Link";
      await utility.valueValidations(
        actualBrokenLink,
        expectedBrokenLink,
        titleBrokwnLink,
        "Scenario 3: Broken Image Verification"
      );
    } catch (error) {
      // Handle any exceptions, such as if the image is not found
      console.error("Error:", error);
      throw error;
    }
  }
}
