const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Ensure reports directory exists
const reportsDir = 'test-results';
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Generate report
report.generate({
  jsonDir: reportsDir,
  reportPath: path.join(reportsDir, 'html-report'),
  metadata: {
    browser: {
      name: process.env.BROWSER || 'chromium',
      version: 'latest'
    },
    device: 'Local Machine',
    platform: {
      name: process.platform,
      version: process.version
    }
  },
  customData: {
    title: 'Test Execution Report',
    data: [
      { label: 'Project', value: 'Playwright BDD Framework' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Date', value: new Date().toLocaleString() },
      { label: 'Environment', value: process.env.ENV || 'QA' }
    ]
  }
});

console.log('HTML Report generated successfully!');
console.log(`Report location: ${path.join(reportsDir, 'html-report', 'index.html')}`);

