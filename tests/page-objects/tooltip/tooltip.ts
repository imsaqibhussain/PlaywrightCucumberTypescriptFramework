import { page } from '../../features/support/hooks';
import { Utilities } from '../common/utilities';

const utility = new Utilities()

export class tootTip {

    // Locators to add values into the web table.
    elementTab = "//div[contains(@class,'card mt-4')]//div";
    widget = "//div[text()='Widgets']"
    tooltip = "(//li[@id='item-6'])[2]"
    start = "#startStopButton"
    hoverButton = "#toolTipButton"
    hovertooltip = "//div[@class='tooltip-inner']"
    buttonText

    async navigateTotoolTip() {
        await page.click(this.elementTab)
        await page.click(this.widget)
        await page.click(this.tooltip)
    }

    async getHoverButtonText() {
        await page.hover(this.hoverButton)
        // Wait for the tooltip or hover effect to appear 
        await page.waitForTimeout(1000);
        // Get the text of the hovered button.
        this.buttonText = await page.innerText(this.hovertooltip);
    }

    async validateHoverText(){
        const details = await utility.readUserDetails();
        const actual = this.buttonText
        const expected = details.hoverText
        const title = 'Tooltip hover text'
        await utility.valueValidations(actual,
            expected,
            title,
            'Tooltip hover verification'
            )
    }
}
