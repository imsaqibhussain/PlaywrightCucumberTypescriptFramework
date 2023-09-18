import { page } from '../../features/support/hooks';
import { Utilities } from '../utilities';

const utility = new Utilities();

export class practiceForm {

  // Locators to add values into the web table.
  elementTab = "//div[contains(@class,'card mt-4')]//div";
  forms = "(//div[@class='header-wrapper'])[2]"
  practiceForm = "(//li[@id='item-0'])[2]"

  //practice form entering data
  firstName = "#firstName"
  lastName = "#lastName"
  Email = "#userEmail"
  male = "//label[@for='gender-radio-1']"
  female = "//label[@for='gender-radio-2']"
  other = "//label[@for='gender-radio-3']"
  phoneNumber = "#userNumber"
  dateOfBirth = "#dateOfBirthInput"
  subject = "#subjectsInput"
  sports = "//label[@for='hobbies-checkbox-1']"
  reading = "//label[@for='hobbies-checkbox-2']"
  music = "//label[@for='hobbies-checkbox-3']"
  picture = "#uploadPicture"
  address = "#currentAddress"
  state = "#state"
  city = "//div[@class=' css-1pahdxg-control']//div"
  // stateTextField = 
  submitButton = "#submit"

  student_name = "//td[text()='Student Name']/following-sibling::td"
  student_email = "//td[text()='Student Email']/following-sibling::td"
  student_gender = "//td[text()='Gender']/following-sibling::td"
  student_mobile = "//td[text()='Mobile']/following-sibling::td"
  student_dob = "//td[text()='Date of Birth']/following-sibling::td"
  student_subjects = "//td[text()='Subjects']/following-sibling::td"
  student_hobbies = "//td[text()='Hobbies']/following-sibling::td"
  student_picture = "//td[text()='Picture']/following-sibling::td"
  student_address = "//td[text()='Address']/following-sibling::td"
  student_cityState = "//td[text()='State and City']/following-sibling::td"

  async navigateToPracticeForm() {
    await page.click(this.elementTab)
    await page.click(this.forms)
    await page.click(this.practiceForm)
  }

  async enterDetails() {
    const details = await utility.readUserDetails();
    await page.fill(this.firstName, details.practiceForm.firstName)
    await page.fill(this.lastName, details.practiceForm.lastName)
    await page.fill(this.Email, details.practiceForm.Email)

    // Find the radio button element using the locator
    let radio: any
    if (details.practiceForm.Gender == 'Male') {
      console.log("Gender is Male")
      radio = await page.locator(this.male);
    }
    else if (details.practiceForm.Gender == 'Female') {
      console.log("Gender is Female")
      radio = await page.locator(this.female);
    }
    else if (details.practiceForm.Gender == 'Other') {
      console.log("Gender is Other")
      radio = await page.locator(this.other);
    }
    // Check the radio button if it's not already checked
    if (!(await radio.isChecked())) {
      await radio.check();
    }

    await page.fill(this.phoneNumber, details.practiceForm.Mobile)

    //Enter date of birth.
    let dob: any = details.practiceForm.dateofBirth.split(' ')
    dob[0] = dob[0].replace('th', '')
    dob[1] = dob[1].substring(0, 3);
    dob[2] = dob[2]
    const newDob = dob[0] + ' ' + dob[1] + ' ' + dob[2]
    await page.click(this.dateOfBirth)
    await page.fill(this.dateOfBirth, newDob)
    await page.click("//div[text()='" + dob[0] + "']")
    await page.waitForTimeout(2000);
    await page.fill(this.subject, details.practiceForm.Subjects)
    await page.waitForTimeout(2000);

    //Hobbies checkbox selection code
    if (details.practiceForm.Hobbies == "Reading") {
      console.log('Selecting Hobby ' + details.practiceForm.Hobbies)
      await page.check(this.reading)
    }
    else if (details.practiceForm.Hobbies == "Sports") {
      console.log('Selecting Hobby ' + details.practiceForm.Hobbies)
      await page.check(this.sports)
    }
    else if (details.practiceForm.Hobbies == "Music") {
      console.log('Selecting Hobby ' + details.practiceForm.Hobbies)
      await page.check(this.music)
    }

    //upload picture
    // Specify the file path to the picture you want to upload
    const filePath = 'tests/setup/expected/'+details.practiceForm.selectAnyPicture; // Replace with the actual file path

    // Attach the file to the file input element
    await page.setInputFiles(this.picture, filePath);

    // Wait for a moment (you can replace this with further actions)
    await page.waitForTimeout(2000);
    //upload picture ends

    await page.fill(this.address, details.practiceForm.currentAddress)
    await page.click(this.state)
    let cityState = details.practiceForm.stateCity.split(',')
    await page.click("//div[text()='" + cityState[0] + "']")
    await page.click("//div[text()='Select City']")
    cityState[1] = cityState[1].replace(' ', '')
    await page.click("//div[text()='" + cityState[1] + "']")
    //submit the practice form
    await page.click(this.submitButton)
  }

  async validateUserDetails(){

    const details: any = await utility.readUserDetails();
    const name = await page.innerText(this.student_name)
    const email = await page.innerText(this.student_email)
    const gender = await page.innerText(this.student_gender)
    const mobile = await page.innerText(this.student_mobile)
    const dob = await page.innerText(this.student_dob)
    const subjects = await page.innerText(this.student_subjects)
    const hobbies = await page.innerText(this.student_hobbies)
    const picture = await page.innerText(this.student_picture)
    const address = await page.innerText(this.student_address)
    const citystate = await page.innerText(this.student_cityState)

    const title: any = []
    const actual: any = []
    const expected: any = []

    //Received date format change to the 
    let formatDob = dob.split(' ')
    formatDob[0] = formatDob[0]+'th'
    let splitYearMonth = formatDob[1].split(',') 
    formatDob[1] = splitYearMonth[0]
    formatDob[2] = splitYearMonth[1]
    
    const newDOBFormat = formatDob[0]+' '+formatDob[1]+' '+formatDob[2]

    actual.push(name,email,gender,mobile,newDOBFormat,subjects,hobbies,picture,address,citystate)
    title.push('Student Name','Student Email','Gender','Mobile','Date of Birth','Subjects','Hobbies','Picture','Address','State and City')
    const expected_fName = details.practiceForm.firstName+' '+details.practiceForm.lastName

    const removeCommaInCity = details.practiceForm.stateCity.replace(',','')
    expected.push(
      expected_fName,
      details.practiceForm.Email,
      details.practiceForm.Gender,
      details.practiceForm.Mobile,
      details.practiceForm.dateofBirth,
      details.practiceForm.Subjects,
      details.practiceForm.Hobbies,
      details.practiceForm.selectAnyPicture,
      details.practiceForm.currentAddress,
      removeCommaInCity
      )
      console.log('Actual Values: ', actual)
      console.log('Expected Values: ', expected)

      await utility.valueValidations(actual,
        expected,
        title,
        "Practice form validation values")
  }
}
