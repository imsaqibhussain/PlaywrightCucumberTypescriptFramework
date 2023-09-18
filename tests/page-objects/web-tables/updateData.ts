import { page } from '../../features/support/hooks';
import { Utilities } from '../utilities';

const utility = new Utilities();

export class updateData {

    elementTab = "//div[contains(@class,'card mt-4')]//div";
    webTable = "//li[@id='item-3']";
    edit = "//span[@id='edit-record-2']//*[name()='svg']"
    firstName = "#firstName";
    lastName = "#lastName";
    submitButton = '#submit';

    //locator to verify for updated second row record
    get_firstName = "//div[@id='app']/div[1]/div[1]/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[2]/div[1]/div[1]"
    get_lastName = "(//div[@class='rt-tr -even']//div)[2]"
    get_age = "//div[@id='app']/div[1]/div[1]/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[2]/div[1]/div[3]"
    get_email = "div#app>div>div>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(3)>div>div:nth-of-type(2)>div:nth-of-type(2)>div>div:nth-of-type(4)"
    get_salary = "//div[@id='app']/div[1]/div[1]/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[2]/div[1]/div[5]"
    get_department = "//div[@id='app']/div[1]/div[1]/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[2]/div[1]/div[6]"
    
    async updateDatafromWebTable() {

        const details: any = await utility.readUserDetails();
        console.log('setup/expected/details.json file values: ', details.updateDetails)

        // Click on the element tab, web table, and add button
        await page.click(this.elementTab);
        await page.click(this.webTable);

        //get all data before updating the details
        const f_name = await page.innerText(this.get_firstName)
        const l_name = await page.innerText(this.get_lastName)
        const age = await page.innerText(this.get_age)
        const email = await page.innerText(this.get_email)
        const salary = await page.innerText(this.get_salary)
        const department = await page.innerText(this.get_department)

        //assinging row 2 existing data to oldDetails object
        const oldDetails = {
            "Email": email,
            "firstName": f_name,
            "lastName": l_name,
            "age": age,
            "salary": salary,
            "department": department
        }
        // assigning oldDetails object to details.existingDetails
        details.existingDetails = oldDetails
        //saving row 2 all existing records into the existingDetails object.
        await utility.writeJSONToFile('details.json', details)

        //Edit the record
        await page.click(this.edit);
         // update the form with user details
        await page.fill(this.firstName, details.updateDetails.firstName);
        await page.fill(this.lastName, details.updateDetails.lastName);
        await page.click(this.submitButton);
        console.log('Record is updated successfully..')
    }

    async validateUpdatedRecordfromWebTable(){
        console.log("In validation function to verify the update record")
        const title: any = [];
        const actual: any = [];
        const expected: any = [];
    
        //get values from web table of newly created record.
        const details = await utility.readUserDetails();
        const f_name = await page.innerText(this.get_firstName);
        const l_name = await page.innerText(this.get_lastName);
        const age = await page.innerText(this.get_age);
        const email = await page.innerText(this.get_email);
        const salary = await page.innerText(this.get_salary);
        const department = await page.innerText(this.get_department);
    
        // Define data titles, actual data, and expected data
        title.push("First Name", "Last Name", "Age", "Email", "Salary", "Department");
        actual.push(f_name, l_name, age, email, salary, department);
        expected.push(details.updateDetails.firstName, details.updateDetails.lastName, details.existingDetails.age, details.existingDetails.Email, details.existingDetails.salary, details.existingDetails.department);
    
        // Perform data validation using the utility function
        await utility.valueValidations(actual, expected, title, "Newly Added Record Validation");

    }
}