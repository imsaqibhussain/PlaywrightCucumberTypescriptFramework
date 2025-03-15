Welcome to the documentation for our automated testing project, powered by Playwright, TypeScript, and the Cucumber BDD framework. This project aims to provide a comprehensive and maintainable testing solution for both UI and API testing.

**1. Introduction**

This project leverages Playwright, TypeScript, and Cucumber to automate UI and API testing. It follows a BDD (Behavior-Driven Development) approach, making test scenarios more readable and comprehensible. The framework also captures failed scenario videos and screenshots to aid in debugging.

**2. Installation**

Before getting started, ensure you have the following libraries and dependencies installed:
	
	npm install axios playwright/test playwright cucumber @cucumber/cucumber path

**3. Project Structure**

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
	|-- features/support
			|--hooks.ts (Hooks)
			|--screenshot (capturing the videos of failed scenario) 
			|--videos (capturing the videos of failed scenarios)
	|-- .gitignore
	|-- README.md
	|-- package.json
	|-- tsconfig.json

**4. How to run the Code**

To run tests, you can use the following npm scripts defined in package.json:

**To run UI tests:**

	npm test tests/features/e2e/ui/ui.feature 

**To run API tests:**

	npm test tests/features/e2e/api/api.feature


**Features**

- Self healing locators implemented
- Dynamic locators implemeted, in this i am keeping all type of locator id, css, xpath in my json file, to make avoid script failure due to locators
- All locators removed from clases files, now all locators are in locators.json file, so we can reuse them anywhere and it is easy to access from anywhere, and keep code clean
- Auto Capture: I am auto capturing locators, so my script work with real time locators instead of hard coding them.
