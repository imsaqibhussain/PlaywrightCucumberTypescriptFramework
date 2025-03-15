import { page } from "../features/support/hooks";
import * as fs from "fs";

export class AutoCapture {
  async captureLocators(): Promise<void> {
    let existingLocators: Record<string, string> = {};

    // Load existing locators if file exists
    const filePath = "dynamic_locators.json";
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      existingLocators = JSON.parse(fileData);
    }

    const newLocators = await page.evaluate(() => {
      const elements = document.querySelectorAll("input, button, a, select, textarea, [role='button']");
      const locatorData: Record<string, string> = {};
      const seenLocators = new Set(Object.values(locatorData)); // Prevent duplicate locators

      elements.forEach((element) => {
        let bestLocator = "";
        let fieldName = element.getAttribute("name") || 
                        element.getAttribute("aria-label") || 
                        element.getAttribute("placeholder") || 
                        element.id || 
                        element.textContent?.trim();

        if (!fieldName && element.id) {
          const label = document.querySelector(`label[for="${element.id}"]`);
          if (label) fieldName = label.textContent?.trim() || element.id;
        }

        if (!fieldName) return; // Ignore elements without meaningful identifiers

        // ✅ Sanitize variable name: Remove invalid characters and enforce a valid format
        fieldName = fieldName.toLowerCase()
          .replace(/[^a-z0-9_]/g, "_") // Remove invalid characters (e.g., "×" → "_")
          .replace(/^_+|_+$/g, "");    // Trim leading/trailing underscores

        if (!fieldName.match(/^[a-z_][a-z0-9_]*$/)) return; // Skip if not a valid variable name

        if (element.id) {
          bestLocator = `#${element.id}`;
        } else if (element.getAttribute("name")) {
          bestLocator = `[name="${element.getAttribute("name")}"]`;
        } else if (element.classList.length === 1) {
          bestLocator = `.${element.classList[0]}`;
        } else if (element.tagName.toLowerCase() === "input" && element.getAttribute("type")) {
          bestLocator = `input[type="${element.getAttribute("type")}"]`;
        } else {
          const getXPath = (el: Element): string => {
            if (!el || el.nodeType !== Node.ELEMENT_NODE) return "";
            if (el.id) return `//*[@id="${el.id}"]`;
            if (!el.parentElement) return "";

            let index = 1;
            let sibling = el.previousElementSibling;
            while (sibling) {
              if (sibling.tagName === el.tagName) index++;
              sibling = sibling.previousElementSibling;
            }

            return `${getXPath(el.parentElement)}/*[${index}]`;
          };

          bestLocator = getXPath(element);
        }

        if (bestLocator && !seenLocators.has(bestLocator)) {
          seenLocators.add(bestLocator);
          locatorData[fieldName] = bestLocator;
        }
      });

      return locatorData;
    });

    // Merge new locators with existing ones
    const mergedLocators = { ...existingLocators, ...newLocators };

    // Save the updated locators back to the file
    fs.writeFileSync(filePath, JSON.stringify(mergedLocators, null, 2));

    console.log(`✅ Captured ${Object.keys(newLocators).length} new locators. Total: ${Object.keys(mergedLocators).length}`);
  }
}




// import { page } from "../features/support/hooks";
// import * as fs from "fs";

// export class AutoCapture {
//   async captureLocators(): Promise<void> {
//     let existingLocators: Record<string, string> = {};

//     // Load existing locators if file exists
//     const filePath = "dynamic_locators.json";
//     if (fs.existsSync(filePath)) {
//       const fileData = fs.readFileSync(filePath, "utf-8");
//       existingLocators = JSON.parse(fileData);
//     }

//     const newLocators = await page.evaluate(() => {
//       const elements = document.querySelectorAll("input, button, a, select, textarea, [role='button']");
//       const locatorData: Record<string, string> = {};
//       const seenLocators = new Set(Object.values(locatorData)); // Prevent duplicate locators

//       elements.forEach((element) => {
//         let bestLocator = "";
//         let fieldName = element.getAttribute("name") || 
//                         element.getAttribute("aria-label") || 
//                         element.getAttribute("placeholder") || 
//                         element.id || 
//                         element.textContent?.trim();

//         if (!fieldName && element.id) {
//           const label = document.querySelector(`label[for="${element.id}"]`);
//           if (label) fieldName = label.textContent?.trim() || element.id;
//         }

//         if (!fieldName) return; // Ignore elements without meaningful identifiers

//         fieldName = fieldName.toLowerCase().replace(/\s+/g, "_");

//         if (element.id) {
//           bestLocator = `#${element.id}`;
//         } else if (element.getAttribute("name")) {
//           bestLocator = `[name="${element.getAttribute("name")}"]`;
//         } else if (element.classList.length === 1) {
//           bestLocator = `.${element.classList[0]}`;
//         } else if (element.tagName.toLowerCase() === "input" && element.getAttribute("type")) {
//           bestLocator = `input[type="${element.getAttribute("type")}"]`;
//         } else {
//           const getXPath = (el: Element): string => {
//             if (!el || el.nodeType !== Node.ELEMENT_NODE) return "";
//             if (el.id) return `//*[@id="${el.id}"]`;
//             if (!el.parentElement) return "";

//             let index = 1;
//             let sibling = el.previousElementSibling;
//             while (sibling) {
//               if (sibling.tagName === el.tagName) index++;
//               sibling = sibling.previousElementSibling;
//             }

//             return `${getXPath(el.parentElement)}/*[${index}]`;
//           };

//           bestLocator = getXPath(element);
//         }

//         if (bestLocator && !seenLocators.has(bestLocator)) {
//           seenLocators.add(bestLocator);
//           locatorData[fieldName] = bestLocator;
//         }
//       });

//       return locatorData;
//     });

//     // Merge new locators with existing ones
//     const mergedLocators = { ...existingLocators, ...newLocators };

//     // Save the updated locators back to the file
//     fs.writeFileSync(filePath, JSON.stringify(mergedLocators, null, 2));

//     console.log(`✅ Captured ${Object.keys(newLocators).length} new locators. Total: ${Object.keys(mergedLocators).length}`);
//   }
// }


// // import { page } from "../features/support/hooks";
// // import * as fs from "fs";

// // export class AutoCapture {
// //   async captureLocators(): Promise<void> {
// //     const locators = await page.evaluate(() => {
// //       const elements = document.querySelectorAll("input, button, a, select, textarea, [role='button']");
// //       const locatorData: Record<string, string> = {};
// //       const seenLocators = new Set(); // To prevent duplicate entries

// //       elements.forEach((element) => {
// //         let bestLocator = "";
// //         let fieldName = element.getAttribute("name") || 
// //                         element.getAttribute("aria-label") || 
// //                         element.getAttribute("placeholder") || 
// //                         element.id || 
// //                         element.textContent?.trim();

// //         if (!fieldName && element.id) {
// //           // Check if there’s a label associated with this element
// //           const label = document.querySelector(`label[for="${element.id}"]`);
// //           if (label) fieldName = label.textContent?.trim() || element.id;
// //         }

// //         if (!fieldName) return; // Ignore elements without meaningful identifiers

// //         fieldName = fieldName.toLowerCase().replace(/\s+/g, "_");

// //         // 1️⃣ ID-Based Locator (Most Stable)
// //         if (element.id) {
// //           bestLocator = `#${element.id}`;
// //         }
// //         // 2️⃣ Name Attribute Locator
// //         else if (element.getAttribute("name")) {
// //           bestLocator = `[name="${element.getAttribute("name")}"]`;
// //         }
// //         // 3️⃣ Unique Class-Based Locator
// //         else if (element.classList.length === 1) {
// //           bestLocator = `.${element.classList[0]}`;
// //         }
// //         // 4️⃣ Tag with Type Attribute
// //         else if (element.tagName.toLowerCase() === "input" && element.getAttribute("type")) {
// //           bestLocator = `input[type="${element.getAttribute("type")}"]`;
// //         }
// //         // 5️⃣ XPath Fallback for Unique Elements
// //         else {
// //           const getXPath = (el: Element): string => {
// //             if (!el || el.nodeType !== Node.ELEMENT_NODE) return "";
// //             if (el.id) return `//*[@id="${el.id}"]`;
// //             if (!el.parentElement) return "";

// //             let index = 1;
// //             let sibling = el.previousElementSibling;
// //             while (sibling) {
// //               if (sibling.tagName === el.tagName) index++;
// //               sibling = sibling.previousElementSibling;
// //             }

// //             return `${getXPath(el.parentElement)}/*[${index}]`;
// //           };

// //           bestLocator = getXPath(element);
// //         }

// //         // Ensure locator is unique
// //         if (bestLocator && !seenLocators.has(bestLocator)) {
// //           seenLocators.add(bestLocator);
// //           locatorData[fieldName] = bestLocator;
// //         }
// //       });

// //       return locatorData;
// //     });

// //     fs.writeFileSync("dynamic_locators.json", JSON.stringify(locators, null, 2));
// //     console.log(`✅ Captured ${Object.keys(locators).length} unique locators and saved to best_locators.json`);
// //   }
// // }
