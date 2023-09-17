import { Given, When, Then } from '@cucumber/cucumber'
import { addData } from '../page-objects/web-tables/addData';

const insertion = new addData()

Given('Go to the url {string}', async function (url) {
    await insertion.open(url)
});

When('Enter the data into table using detailsJSON values', async function () {
    await insertion.addDatainWebTable()
});

Then('Validate the newly created record', async function () {
    await insertion.validateAddedData()
});