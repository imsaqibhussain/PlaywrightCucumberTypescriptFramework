import { page } from '../../features/support/hooks';
import { Utilities } from '../utilities';

const utility = new Utilities();

export class verifyImage {

  // Locators to add values into the web table.
  elementTab = "//div[contains(@class,'card mt-4')]//div";
  brokenImage = "//li[@id='item-6']";

  async navigationToBrokenImages(){
    await page.click(this.elementTab)
    await page.click(this.brokenImage)
  }

  async validateBrokenImage(){
    try {
        // Find the image element
        const imageElement = await page.locator("(//div[contains(@class,'col-12 mt-4')]//img)[2]");
        // Get the "src" attribute of the image
        const actualBrokenLink = await imageElement.getAttribute('src');  
        const expectedBrokenLink = '/images/Toolsqa_1.jpg'
        const titleBrokwnLink = 'Broken Image Link'
        await utility.valueValidations(actualBrokenLink,expectedBrokenLink,titleBrokwnLink, "Scenario 3: Broken Image Verification")

      } catch (error) {
        // Handle any exceptions, such as if the image is not found
        console.error('Error:', error);
        throw error;
      }
  }
}
