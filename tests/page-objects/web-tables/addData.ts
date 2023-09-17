import { page } from '../../features/support/hooks';
import { Utilities } from '../utilities';

const utility = new Utilities();

export class addData {

  // Locators to add values into the web table.
  elementTab = "//div[contains(@class,'card mt-4')]//div";
  webTable = "//li[@id='item-3']";
  addButton = "#addNewRecordButton";
  firstName = "#firstName";
  lastName = "#lastName";
  email = "#userEmail";
  age = "#age";
  salary = "#salary";
  department = "#department";
  submitButton = '#submit';

  // Locators to get values from the web table.
  get_firstNameLocator = "//div[@id='app']/div[1]/div[1]/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[4]/div[1]/div[1]";
  get_lastNameLocator = "//div[@id='app']/div[1]/div[1]/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[4]/div[1]/div[2]";
  get_Age = "//div[@id='app']/div[1]/div[1]/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[4]/div[1]/div[3]";
  get_email = "//div[@id='app']/div[1]/div[1]/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[4]/div[1]/div[4]";
  get_salary = "//div[@id='app']/div[1]/div[1]/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[4]/div[1]/div[5]";
  get_department = "//div[@id='app']/div[1]/div[1]/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[4]/div[1]/div[6]";

  async open(url: string) {
    // Open the provided URL
    console.log('visit the page: ', url)
    await page.goto(url);
  }

  async addDatainWebTable() {
    const details: any = await utility.readUserDetails();
    console.log('setup/expected/details.json file values: ', details)

    // Click on the element tab, web table, and add button
    await page.click(this.elementTab);
    await page.click(this.webTable);
    await page.click(this.addButton);

    // Fill the form with user details
    await page.fill(this.firstName, details.userDetails.firstName);
    await page.fill(this.lastName, details.userDetails.lastName);
    await page.fill(this.email, details.userDetails.Email);
    await page.fill(this.age, details.userDetails.age);
    await page.fill(this.salary, details.userDetails.salary);
    await page.fill(this.department, details.userDetails.department);
    await page.click(this.submitButton);
    console.log('Record is added successfully..')
  }

  async validateAddedData() {
    console.log('In validation function to validate the added record..')
    const title: any = [];
    const actual: any = [];
    const expected: any = [];

    //get values from web table of newly created record.
    const details = await utility.readUserDetails();
    const f_name = await page.innerText(this.get_firstNameLocator);
    const l_name = await page.innerText(this.get_lastNameLocator);
    const age = await page.innerText(this.get_Age);
    const email = await page.innerText(this.get_email);
    const salary = await page.innerText(this.get_salary);
    const department = await page.innerText(this.get_department);

    // Define data titles, actual data, and expected data
    title.push("First Name", "Last Name", "Age", "Email", "Salary", "Department");
    actual.push(f_name, l_name, age, email, salary, department);
    expected.push(details.userDetails.firstName, details.userDetails.lastName, details.userDetails.age, details.userDetails.Email, details.userDetails.salary, details.userDetails.department);

    // Perform data validation using the utility function
    await utility.valueValidations(actual, expected, title, "Newly Added Record Validation");
  }
}
