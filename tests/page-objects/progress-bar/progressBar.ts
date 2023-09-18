import { page } from '../../features/support/hooks';
import { Utilities } from '../utilities';

const utility = new Utilities()

export class progressBar {

  // Locators to add values into the web table.
  elementTab = "//div[contains(@class,'card mt-4')]//div";
  widget = "//div[text()='Widgets']"
  progressBar = "(//li[@id='item-4'])[3]"
  start = "#startStopButton"

  async navigateToProgressBar() {
    await page.click(this.elementTab)
    await page.click(this.widget)
    await page.click(this.progressBar)
  }

  async startTheProgressBar() {
    await page.click(this.start)
  }

  async validateProgressbar() {
    // Wait for the progress bar to reach 100%
   
    // Get the maximum percentage from progress bar
    const percntage = await page.$eval('[role="progressbar"]', (progressBar) =>
      progressBar.getAttribute('aria-valuemax')
    );

    const actual:any = percntage
    const expected:any = '100'
    const title:any = 'Percentage'

    await utility.valueValidations(
      actual,
      expected,
      title,
      'Progress bar validation on completion',
    )
  }
}
