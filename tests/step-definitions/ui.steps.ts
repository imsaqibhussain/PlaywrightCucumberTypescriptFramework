import { Given, When, Then } from '@cucumber/cucumber'
import { page } from '../features/support/hooks';

Given('Go to the url {string}', async function (url) {
    // Write code here that turns the phrase above into concrete actions
    await page.goto(url)
    console.log("page is open")
    // await page.click("//div[contains(@class,'card mt-4')]//div") //click on element tab
    // await page.click("//li[@id='item-3']") //click on web table
    // await page.click("#addNewRecordButton") //Add new record
});

When('Enter the data into table using these values {string} {string} {string} {string} {string} {string}', async function (firstname, lastname, age, email, salary, department) {
    // Write code here that turns the phrase above into concrete actions
    await page.click("//div[contains(@class,'card mt-4')]//div") //click on element tab
    await page.click("//li[@id='item-3']") //click on web table
    await page.click("#addNewRecordButton") //Add new record
    await page.fill("#firstName",firstname)
    await page.fill("#lastName",lastname)
    await page.fill("#userEmail",email)
    await page.fill("#age",age)
    await page.fill("#salary",salary)
    await page.fill("#department",department)
    await page.click('#submit')
});

Then('Validate the newly created record', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log('testing')
});