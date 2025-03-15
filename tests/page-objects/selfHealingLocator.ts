import { Locator, Page } from '@playwright/test';
import { page } from '../features/support/hooks';

export class SelfHealingLocator {
  private locators: string[];
  private enableHealing: boolean;

  constructor(locators: string[], enableHealing = false) {
    this.locators = locators;
    this.enableHealing = enableHealing; // Enable AI-based healing in the future
  }

  async findElement(): Promise<Locator | null> {
    for (const locator of this.locators) {
      try {
        const element = page.locator(locator);
        if (await element.count() > 0) {
          console.log(`✅ Found element using: ${locator}`);
          return element;
        }
      } catch (error) {
        console.warn(`❌ Failed locator: ${locator}`);
      }
    }

    if (this.enableHealing) {
      return await this.selfHeal(); // Try to heal broken locators
    }

    console.error(`🚨 No valid locator found.`);
    return null;
  }

  async click() {
    const element = await this.findElement();
    if (element) {
      await element.click();
    } else {
      throw new Error("🚨 No valid locator found for click action.");
    }
  }

  async fill(value: string) {
    const element = await this.findElement();
    if (element) {
      await element.fill(value);
    } else {
      throw new Error(`🚨 No valid locator found to fill value: ${value}`);
    }
  }

  private async selfHeal(): Promise<Locator | null> {
    console.log("🔄 Attempting self-healing...");
    // Future AI-Based logic will go here (e.g., auto-generating new locators)
    return null;
  }
}
