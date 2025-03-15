import { page , locators ,Utilities,dynamic_locators, addData } from '../common/commonImports';

const utility = new Utilities();
const add = new addData()

export class updateData {
 
    async updateDatafromWebTable() {

        let previousData: any []
        const details: any = await utility.readUserDetails();
        const expectedJson: any = await utility.readExpectedDetails()
        await page.click(locators.webTableRecordRow)
        previousData = await add.getEmployeeRecord(dynamic_locators)
        await page.click(dynamic_locators.close)

        expectedJson.existingDetails.firstName = previousData[0]
        expectedJson.existingDetails.lastName = previousData[1]
        expectedJson.existingDetails.age = previousData[2]
        expectedJson.existingDetails.Email = previousData[3]
        expectedJson.existingDetails.salary = previousData[4]
        expectedJson.existingDetails.department = previousData[5]

        //Edit the record
        await page.click(locators.webTableRecordRow)
        await page.fill(dynamic_locators.first_name, details.updateDetails.firstName);
        await page.fill(dynamic_locators.last_name, details.updateDetails.lastName);
        await page.click(dynamic_locators.submit);

        expectedJson.updatedDetails.firstName = details.updateDetails.firstName
        expectedJson.updatedDetails.lastName = details.updateDetails.lastName

        await utility.writeJSONToFile('expected.json', expectedJson)
        console.log('Record is updated successfully..')
    }

    async validateUpdatedRecordfromWebTable(){
        console.log("In validation function to verify the update record")
        const title: any = [];
        let actual: any = [];
        const expected: any = [];
    
        //get values from web table of newly created record.
        const details = await utility.readUserDetails()
        const expectedJson = await utility.readExpectedDetails()

        await page.fill(dynamic_locators.type_to_search,expectedJson.updatedDetails.firstName)
        await page.click(locators.webTableRecordRow)
        actual = await add.getEmployeeRecord(dynamic_locators)
    
        // Define data titles, actual data, and expected data
        title.push("First Name", "Last Name", "Age", "Email", "Salary", "Department");
        // actual.push(f_name, l_name, age, email, salary, department);
        expected.push(expectedJson.updatedDetails.firstName, expectedJson.updatedDetails.lastName, expectedJson.existingDetails.age, expectedJson.existingDetails.Email, expectedJson.existingDetails.salary, expectedJson.existingDetails.department);
    
        // Perform data validation using the utility function
        await utility.valueValidations(actual, expected, title, "Updated Record Validation");

    }
}