import { Given, When, Then } from '@cucumber/cucumber'
import { addData } from '../page-objects/web-tables/addData';
import { updateData } from '../page-objects/web-tables/updateData';
import { verifyImage } from '../page-objects/broken-images/verifyImage'
import { practiceForm } from '../page-objects/forms/practiceForm'
import { progressBar } from '../page-objects/progress-bar/progressBar';
import { tootTip } from '../page-objects/tooltip/tooltip';
import { dragDrop } from '../page-objects/drag-drop/drag';

const insertion = new addData()
const updation = new updateData()
const brokenImage = new verifyImage()
const form = new practiceForm()
const bar = new progressBar()
const tooltip = new tootTip()
const drag = new dragDrop()

Given('Go to the url {string}', async function (url) {
    await insertion.open(url)
});

When('Enter the data into table using detailsJSON values', async function () {
    await insertion.addDatainWebTable()
});

Then('Validate the newly created record', async function () {
    await insertion.validateAddedData()
});
// Scenario 2
When('Update the user record from webtable', async function () {
    await updation.updateDatafromWebTable()
});

Then('Validate the updated record', async function () {
    await updation.validateUpdatedRecordfromWebTable()
});
// Scenario 2 end

// Scenario 3 Borken Image Start
When('Naigate to the broken image section', async function () {
    await brokenImage.navigationToBrokenImages()
});

Then('Validate the broken image', async function () {
    console.log('testing')
    await brokenImage.validateBrokenImage()
});
//Scenario 3 Borken Image End

//Scenario 4: practice form
When('Naigate to the practice form and submit with filled details', async function () {
    await form.navigateToPracticeForm()
    await form.enterDetails()
});

Then('Validate the entered data from popup', async function () {
    await form.validateUserDetails()
});
//Scenario 4: practice form end

// Scenario 5 Progress bar

When('Naigate to the widget and start the progress bar', async function () {
    await bar.navigateToProgressBar()
    await bar.startTheProgressBar()
});

Then('Validate the progress bar', async function () {

    await bar.validateProgressbar()
});

// Scenario 5 Progress bar end

// Scenario 6 Verify the tooltip

When('Navigate to the widget tooltip and hover the button', async function () {
    await tooltip.navigateTotoolTip()
    await tooltip.getHoverButtonText()
});

Then('Validate the tooltip', async function () {
    await tooltip.validateHoverText()
});

// Scenario 6 Verify the tooltip end

//Scenario 7 Start
When('Navigate to the interactions droppable perform drag and drop', async function () {
    await drag.navigatedragDropInteraction()
    await drag.dragDrop()
});

Then('Validate the drag and drop', async function () {
    await drag.validateDragDrop()
});
//Scenario 7 End
