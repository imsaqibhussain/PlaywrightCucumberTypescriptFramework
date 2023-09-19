Automated Testing Project with Playwright, TypeScript, and Cucumber BDD Framework
Welcome to the documentation for our automated testing project, powered by Playwright, TypeScript, and the Cucumber BDD framework. This project aims to provide a comprehensive and maintainable testing solution for both UI and API testing.

Table of Contents
Introduction
Installation
Project Structure
Usage
Reporting
Contributing
License
1. Introduction
This project leverages Playwright, TypeScript, and Cucumber to automate UI and API testing. It follows a BDD (Behavior-Driven Development) approach, making test scenarios more readable and comprehensible. The framework also captures failed scenario videos and screenshots to aid in debugging.

2. Installation
Before getting started, ensure you have the following libraries and dependencies installed:

Axios
Playwright/Test
Playwright
Cucumber
'@cucumber/cucumber'
Path
fs
You can install these dependencies using npm:

bash
Copy code
npm install axios playwright/test playwright cucumber @cucumber/cucumber path fs
3. Project Structure
The project is divided into two main categories: UI and API testing. Here is an overview of the project structure:

lua
Copy code
project-root/
|-- tests/
|   |-- features/
|   |   |-- e2e/
|   |   |   |-- ui/
|   |   |   |   |-- ui.feature
|   |   |   |
|   |   |   |-- api/
|   |   |       |-- api.feature
|   |
|-- step-definitions/
|   |-- ui.steps.ts
|   |-- api.steps.ts
|
|-- data/expected
|   |-- api.json
|   |-- detail.json (UI-specific data)
|
|-- utilities/
|   |-- common.ts (Common utility functions)
|
|-- project-objects/
|   |-- [Page Object Model folders and test case classes]
|
|-- hooks.ts (Hooks for setup and teardown)
|-- .gitignore
|-- README.md
|-- package.json
|-- tsconfig.json
|-- [Other configuration files]
tests/: Contains BDD feature files organized by categories (UI and API).
step-definitions/: Contains step definition files for UI and API testing.
data/: Stores JSON files with test data. api.json is for API tests, and detail.json is for UI tests.
utilities/: Houses common utility functions.
project-objects/: Implements the Page Object Model with test case classes.
hooks.ts: Contains setup and teardown hooks.
.gitignore: Excludes unnecessary files and directories from version control.
package.json: Defines project dependencies and scripts.
tsconfig.json: TypeScript configuration file.
[Other configuration files]: Additional project configuration files, if necessary.
4. Usage
To run tests, you can use the following npm scripts defined in package.json:

To run UI tests:

bash
Copy code
npm test tests/features/e2e/ui/ui.feature
To run API tests:

bash
Copy code
npm test tests/features/e2e/api/api.feature
You can customize and extend these scripts according to your needs.

5. Reporting
This framework captures videos and screenshots for failed scenarios, aiding in debugging. The captured assets can be found in a designated folder (e.g., failures/) after test execution.
