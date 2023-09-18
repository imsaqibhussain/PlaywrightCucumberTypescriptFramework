import { Given, When, Then } from '@cucumber/cucumber'
import { addData } from '../page-objects/web-tables/addData';
import { updateData } from '../page-objects/web-tables/updateData';
import { verifyImage } from '../page-objects/broken-images/verifyImage'

const insertion = new addData()
const updation = new updateData()
const brokenImage = new verifyImage()

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

When('Naigate to the broken image section', async function () {
    await brokenImage.navigationToBrokenImages()
});

Then('Validate the broken image', async function () {
    console.log('testing')
    await brokenImage.validateBrokenImage()
});
