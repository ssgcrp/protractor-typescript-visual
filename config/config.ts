import * as dotenv from 'dotenv';
dotenv.config();
import { browser, Config } from 'protractor';
import { Reporter } from '../support/reporter';
const jsonReports = process.cwd() + '/reports/json';

export const config: Config = {
  seleniumAddress: 'https://hub.screener.io:443/wd/hub',

  SELENIUM_PROMISE_MANAGER: false,

  baseUrl: 'https://www.google.com',

  capabilities: {
    browserName: 'chrome',
    'sauce:visual': {
      apiKey: process.env.SCREENER_API_KEY,
      projectName: 'luis/protractor-typescript',
      viewportSize: '1280x1024',
    },
    'sauce:options': {
      name: 'ProtractorTest',
      username: process.env.SAUCE_USERNAME,
      accesskey: process.env.SAUCE_ACCESS_KEY,
      commandTimeout: 300,
      idleTimeout: 300,
      screenResolution: '1440x900',
    },
  },

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  specs: ['../../features/*.feature'],

  onPrepare: () => {
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
    Reporter.createDirectory(jsonReports);
  },

  cucumberOpts: {
    compiler: 'ts:ts-node/register',
    format: 'json:./reports/json/cucumber_report.json',
    require: [
      '../../typeScript/stepdefinitions/*.js',
      '../../typeScript/support/*.js',
    ],
    strict: true,
    tags: '@CucumberScenario or @ProtractorScenario or @TypeScriptScenario or @OutlineScenario',
  },

  onComplete: () => {
    Reporter.createHTMLReport();
  },
};
