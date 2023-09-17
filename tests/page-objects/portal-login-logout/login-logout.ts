import { page } from '../../features/support/hooks'
export class Login {

      // loginButtonSelector = 'button[data-type="login"]';
    //   this.email = '#ctl00_ctl00_BotContent_loginSignup_email_address';
    //   this.password = '#ctl00_ctl00_BotContent_loginSignup_txtpassword';
    //   this.signUp = '#ctl00_ctl00_BotContent_loginSignup_BtnReg';
    //   this.lout = '#ctl00_ctl00_BotContent_hreflogout';

  
    // Open the CareerPortal page with the given URL
    async open(URL: string) {
      

console.log("In page objectc");
      // Navigate to the provided URL
      await page.goto(URL);
    }
  



    // // Perform login using the provided username and password
    // async login(username, password) {
    //   // Click the login button
    //   await global.page.click(this.loginButton);
    //   // Fill in the email and password fields
    //   await global.page.fill(this.email, username);
    //   await global.page.fill(this.password, password);
    //   // Click the sign-up button to log in
    //   await global.page.click(this.signUp);
    // }
  
    // // Perform logout from the CareerPortal
    // async portalLogout() {
    //   // Click the logout button to log out from the portal
    //   await global.page.click(this.logout);
    // }
  
  }
