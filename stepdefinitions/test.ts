import { browser, protractor } from 'protractor';
import { SearchPageObject } from '../pages/searchPage';
const { Given, Then, When, setDefaultTimeout } = require('cucumber');
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

const search: SearchPageObject = new SearchPageObject();

setDefaultTimeout(60 * 1000);

Given(/^I am on "(.*?)" search page$/, async (text) => {
  await browser.executeScript('/*@visual.init*/', `My Visual Test page ${text}`);
  await expect(browser.getTitle()).to.eventually.equal('Google');
  await browser.executeScript('/*@visual.snapshot*/', 'Home');
});

When(/^I type "(.*?)"$/, async (text) => {
  await search.searchTextBox.sendKeys(text);
  await browser.executeScript('/*@visual.snapshot*/', 'Send Keys');
});

When(/^I click on search button$/, async () => {
  await browser.actions().sendKeys(protractor.Key.ENTER).perform();
  await browser.executeScript('/*@visual.snapshot*/', 'Results');
  const result = await browser.executeScript('/*@visual.end*/');
  console.log(JSON.stringify(result));
});

