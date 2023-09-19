import { page } from '../../features/support/hooks';
import { Utilities } from '../utilities';

const utility = new Utilities()

export class dragDrop {

    interaction = "//div[@id='app']/div[1]/div[1]/div[2]/div[1]/div[5]/div[1]"
    droppable = "//div[@id='app']/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[5]/div[1]/ul[1]/li[4]"
    draggableItem = "//div[@class='simple-drop-container']//div[1]"
    targetItem = "(//div[@class='simple-drop-container']//div)[2]"
    simpleDropContainer = "#simpleDropContainer"
    droptext = "//div[@id='droppable']//p"

    async navigatedragDropInteraction() {
        await page.click(this.interaction)
        await page.click(this.droppable)
    }

    async dragDrop() {
        await page.waitForLoadState()
        await page.waitForSelector(this.draggableItem)
        await page.waitForSelector(this.targetItem)
        await page.waitForTimeout(2000);
        await page.locator(this.draggableItem).dragTo(page.locator(this.targetItem));  
    }

    async validateDragDrop(){
        const droppedBoxText = await page.innerText(this.droptext)
        const details = await utility.readUserDetails();
        const expected = details.droppedText
        const actual = droppedBoxText
        const title = "Drag Drop Text"
        await utility.valueValidations(
            actual,
            expected,
            title,
            "Drop and Drop functionality Verification"
        )
    }
}