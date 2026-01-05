const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');
const dotenv = require('dotenv');
const logger = require('../utils/logger');

// Load environment variables
dotenv.config();

// Set default timeout
setDefaultTimeout(parseInt(process.env.TIMEOUT || '60000'));

// Global variables
let browser;
let context;

// Browser configuration
const browserConfig = {
  headless: process.env.HEADLESS === 'true',
  slowMo: parseInt(process.env.SLOW_MO || '0'),
  args: ['--start-maximized'],
  viewport: null
};

BeforeAll(async function () {
  logger.info('=== Test Execution Started ===');
  logger.info(`Browser: ${process.env.BROWSER || 'chromium'}`);
  logger.info(`Headless: ${process.env.HEADLESS || 'true'}`);
  logger.info(`Base URL: ${process.env.BASE_URL}`);
});

Before(async function (scenario) {
  logger.info(`Starting scenario: ${scenario.pickle.name}`);
  
  // Launch browser based on environment variable
  const browserType = process.env.BROWSER || 'chromium';
  
  switch (browserType.toLowerCase()) {
    case 'firefox':
      browser = await firefox.launch(browserConfig);
      break;
    case 'webkit':
      browser = await webkit.launch(browserConfig);
      break;
    default:
      browser = await chromium.launch(browserConfig);
  }

  // Create context with tracing
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: process.env.VIDEO === 'on' ? { dir: 'test-results/videos/' } : undefined
  });

  // Start tracing
  await context.tracing.start({ screenshots: true, snapshots: true });

  // Create page
  const page = await context.newPage();
  
  // Attach to world
  this.browser = browser;
  this.context = context;
  this.page = page;
  this.baseURL = process.env.BASE_URL;
});

After(async function (scenario) {
  const scenarioStatus = scenario.result.status;
  logger.info(`Scenario: ${scenario.pickle.name} - Status: ${scenarioStatus}`);

  // Take screenshot on failure
  if (scenarioStatus === Status.FAILED) {
    const screenshot = await this.page.screenshot({ 
      path: `test-results/screenshots/${scenario.pickle.name.replace(/ /g, '_')}_${Date.now()}.png`,
      fullPage: true 
    });
    await this.attach(screenshot, 'image/png');
    logger.error(`Scenario failed: ${scenario.pickle.name}`);
  }

  // Stop tracing and save
  await this.context.tracing.stop({ 
    path: `test-results/traces/${scenario.pickle.name.replace(/ /g, '_')}_${Date.now()}.zip` 
  });

  // Close page and context
  if (this.page) {
    await this.page.close();
  }
  
  if (this.context) {
    await this.context.close();
  }

  // Close browser
  if (this.browser) {
    await this.browser.close();
  }
});

AfterAll(async function () {
  logger.info('=== Test Execution Completed ===');
});

