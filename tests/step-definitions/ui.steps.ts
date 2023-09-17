import { Given, When, Then } from '@cucumber/cucumber'
import { addData } from '../page-objects/web-tables/addData';
import { updateData } from '../page-objects/web-tables/updateData';

const insertion = new addData()
const updation = new updateData()

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
