const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber-report.json',
    output: 'reports/cucumber-report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "Test Environment": "QA",
        "Browser": "Chrome 120.0",
        "Platform": "Windows 10",
        "Parallel Execution": "No",
        "Executed": "Local"
    }
};

reporter.generate(options);
