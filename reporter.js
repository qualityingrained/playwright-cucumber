const reporter = require('cucumber-html-reporter')

const options = {
    theme: "bootstrap",
    jsonFile: "cucumber_report.json",
    output: "reports/cucumber_report.html",
    reportSuiteAsScenario: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        'app-version': '2.0.0',
        'test environment': 'ACC',
        Browser: 'chrome',
        Platform: 'Windows 10'
    }
}

reporter.generate(options)