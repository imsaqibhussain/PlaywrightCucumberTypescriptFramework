import { page, Utilities, SelfHealingLocator, locators } from '../common/commonImports';

const utility = new Utilities();

export class addData {

  async open(url: string) {
    // Open the provided URL
    console.log('visit the page: ', url)
    await page.goto(url);
  }
  
  async addDatainWebTable() {

    // reading user details from JSON file
    const details: any = await utility.readUserDetails();
    let dynamic_locators = await utility.captureLocatorandSave()

    //Dynamic Locators techniques for backup locators calling in case primiary locator is broken
    const elementButton = new SelfHealingLocator(locators.elementButton);
    await elementButton.click();

    await page.click(locators.webTable);
    dynamic_locators = await utility.captureLocatorandSave()

    await page.click(dynamic_locators.addnewrecordbutton)
    dynamic_locators = await utility.captureLocatorandSave()

    await page.fill(dynamic_locators.first_name, details.userDetails.firstName);
    await page.fill(dynamic_locators.last_name, details.userDetails.lastName);
    await page.fill(dynamic_locators.name_example_com, details.userDetails.Email);
    await page.fill(dynamic_locators.age, details.userDetails.age);
    await page.fill(dynamic_locators.salary, details.userDetails.salary);
    await page.fill(dynamic_locators.department, details.userDetails.department);
    await page.click(dynamic_locators.submit);
    
    console.log('Record is added successfully..')
  }


  async getEmployeeRecord(dynamic_locators){
    let valuesarray
    const f_name = await page.inputValue(dynamic_locators.first_name)
    const l_name = await page.inputValue(dynamic_locators.last_name);
    const age= await page.inputValue(dynamic_locators.age);
    const email = await page.inputValue(dynamic_locators.name_example_com);
    const salary = await page.inputValue(dynamic_locators.salary);
    const department = await page.inputValue(dynamic_locators.department);
    
    return valuesarray = [f_name, l_name , age, email , salary, department]

  }

  async validateAddedData() {

    const details = await utility.readUserDetails();
    let dynamic_locators = await utility.captureLocatorandSave()

    await page.fill(dynamic_locators.type_to_search, details.userDetails.firstName)
    await page.click(locators.webTableRecordRow)

    console.log('In validation function to validate the added record..')
    const title: any = [];
    let actual: any = [];
    const expected: any = [];

    // Define data titles, actual data, and expected data
    title.push("First Name", "Last Name", "Age", "Email", "Salary", "Department");
    actual = await this.getEmployeeRecord(dynamic_locators)
    expected.push(details.userDetails.firstName, details.userDetails.lastName, details.userDetails.age, details.userDetails.Email, details.userDetails.salary, details.userDetails.department);

    await page.click(dynamic_locators.close)
    // Perform data validation using the utility function
    await utility.valueValidations(actual, expected, title, "Newly Added Record Validation");
  }
}
