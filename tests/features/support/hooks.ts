import { BeforeAll, Before, AfterAll, After, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';

// You can also import other Playwright modules you need.

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

// Function to set up the context and page
Before(async () => {
  context = await browser?.newContext({
    viewport: { width: 1920, height: 1080 }, // Set the desired viewport size
  }
  );
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
