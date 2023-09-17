// Import necessary modules
import { BeforeAll, Before, AfterAll, After, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';

// You can also import other Playwright modules you need.

let scenarioName: string | undefined;
let oldvideoPath: string | undefined;

let browser: Browser | undefined;
let context: BrowserContext | undefined;
let page: Page | undefined;

setDefaultTimeout(320000);

// Function to launch the browser
BeforeAll(async () => {
  browser = await chromium.launch({
    headless: false, // Open with browser (false) or without browser (true)
    slowMo: 900, // Slow motion for better visibility
  });
});

// // Function to create a browser context with video recording
// async function createBrowserContextwithRecording() {
//   context = await browser.newContext({
//     recordVideo: {
//       dir: path.join(__dirname, 'videos'), // Video recording directory
//       size: { width: 640, height: 480 }, // Video dimensions
//     },
//   });
//   await createPageContext();
// }

// Function to create a new page context
async function createPageContext() {
  page = await context.newPage();
}

// // Function to capture a screenshot
// async function captureScreenshot() {
//   const screenshotPath = path.join(__dirname, 'screenshots');
//   if (!fs.existsSync(screenshotPath)) {
//     fs.mkdirSync(screenshotPath);
//   }
//   const screenshotName = `${scenarioName}_${new Date()
//     .toLocaleString()
//     .replace(/[/:,]/g, '_')}.png`;
//   console.log('screenshotName: ', screenshotName);
//   const screenshotFilePath = path.join(screenshotPath, screenshotName);
//   await page.screenshot({ path: screenshotFilePath });
// }

// async function renamedCapturedVideo() {
//   try {
//     await page.close();
//     const newVideoName = `${scenarioName}_${new Date()
//       .toLocaleString()
//       .replace(/[/:,]/g, '_')}.webm`;
//     const newVideoPath = path.join(__dirname, 'videos', newVideoName);

//     let isVideoWritten = false;
//     let attemptCount = 0;
//     const maxAttempts = 10; // Maximum number of attempts
//     const retryDelay = 5000; // Delay between attempts in milliseconds

 

//     while (!isVideoWritten && attemptCount < maxAttempts) {
//       try {
//         await fs.promises.rename(oldvideoPath, newVideoPath);
//         isVideoWritten = true;
//         console.log('File is renamed');
//       } catch (error) {
//         console.error(
//           `Error while renaming the video (attempt ${attemptCount + 1}):` //, error
//         );
//         attemptCount++;
//         await new Promise((resolve) => setTimeout(resolve, retryDelay));
//       }
//     }

//     if (!isVideoWritten) {
//       console.error('Failed to rename the video after multiple attempts.');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// // Function to close the context
// async function closeContext() {
//   await page.close();
//   await page.video()?.delete(); // Delete the recorded video
//   await context.close();
// }



// Before Hook: Create a new browser context and page before each scenario
// Before(async (scenario) => {
//   scenarioName = scenario.pickle.name;
//   await createBrowserContextwithRecording();
// });

// // After Hook: Cleanup and capture a screenshot after each scenario
// After(async function (scenario) {
//   oldvideoPath = await page.video()?.path();
//   if (scenario.result?.status === Status.FAILED) {
//     await captureScreenshot();
//     console.log('Scenario is failed.');
//     await renamedCapturedVideo();
//   } else {
//     await closeContext();
//     console.log('Your scenario is looking good!.');
//   }
// });

// Function to set up the context and page
Before(async () => {
  context = await browser?.newContext();
  page = await context?.newPage();
});

// Function to close the browser context after each scenario
After(async () => {
  if (context) {
    await context.close();
  }
});

// Function to close the browser after all scenarios
AfterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

export { page, browser, context };
