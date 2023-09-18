import { Given, When, Then } from '@cucumber/cucumber'
import { addData } from '../page-objects/web-tables/addData';
import { updateData } from '../page-objects/web-tables/updateData';
import { verifyImage } from '../page-objects/broken-images/verifyImage'
import { practiceForm } from '../page-objects/forms/practiceForm'

const insertion = new addData()
const updation = new updateData()
const brokenImage = new verifyImage()
const form = new practiceForm()

Given('Go to the url {string}', async function (url) {
    await insertion.open(url)
});

When('Enter the data into table using detailsJSON values', async function () {
    await insertion.addDatainWebTable()
});

Then('Validate the newly created record', async function () {
    await insertion.validateAddedData()
});

When('Update the user record from webtable', async function () {
    await updation.updateDatafromWebTable()
});

Then('Validate the updated record', async function () {
    await updation.validateUpdatedRecordfromWebTable()
});

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

