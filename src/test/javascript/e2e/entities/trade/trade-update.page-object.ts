import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TradeUpdatePage {
  pageTitle: ElementFinder = element(by.id('positionApp.trade.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  uniqueTagInput: ElementFinder = element(by.css('input#trade-uniqueTag'));
  tradeDateInput: ElementFinder = element(by.css('input#trade-tradeDate'));
  sideInput: ElementFinder = element(by.css('input#trade-side'));
  quantityInput: ElementFinder = element(by.css('input#trade-quantity'));
  productIdInput: ElementFinder = element(by.css('input#trade-productId'));
  priceInput: ElementFinder = element(by.css('input#trade-price'));
  currencyInput: ElementFinder = element(by.css('input#trade-currency'));
  executionTimeInput: ElementFinder = element(by.css('input#trade-executionTime'));
  primaryAccountInput: ElementFinder = element(by.css('input#trade-primaryAccount'));
  versusAccountInput: ElementFinder = element(by.css('input#trade-versusAccount'));
  traderInput: ElementFinder = element(by.css('input#trade-trader'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUniqueTagInput(uniqueTag) {
    await this.uniqueTagInput.sendKeys(uniqueTag);
  }

  async getUniqueTagInput() {
    return this.uniqueTagInput.getAttribute('value');
  }

  async setTradeDateInput(tradeDate) {
    await this.tradeDateInput.sendKeys(tradeDate);
  }

  async getTradeDateInput() {
    return this.tradeDateInput.getAttribute('value');
  }

  async setSideInput(side) {
    await this.sideInput.sendKeys(side);
  }

  async getSideInput() {
    return this.sideInput.getAttribute('value');
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  async setProductIdInput(productId) {
    await this.productIdInput.sendKeys(productId);
  }

  async getProductIdInput() {
    return this.productIdInput.getAttribute('value');
  }

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return this.priceInput.getAttribute('value');
  }

  async setCurrencyInput(currency) {
    await this.currencyInput.sendKeys(currency);
  }

  async getCurrencyInput() {
    return this.currencyInput.getAttribute('value');
  }

  async setExecutionTimeInput(executionTime) {
    await this.executionTimeInput.sendKeys(executionTime);
  }

  async getExecutionTimeInput() {
    return this.executionTimeInput.getAttribute('value');
  }

  async setPrimaryAccountInput(primaryAccount) {
    await this.primaryAccountInput.sendKeys(primaryAccount);
  }

  async getPrimaryAccountInput() {
    return this.primaryAccountInput.getAttribute('value');
  }

  async setVersusAccountInput(versusAccount) {
    await this.versusAccountInput.sendKeys(versusAccount);
  }

  async getVersusAccountInput() {
    return this.versusAccountInput.getAttribute('value');
  }

  async setTraderInput(trader) {
    await this.traderInput.sendKeys(trader);
  }

  async getTraderInput() {
    return this.traderInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setUniqueTagInput('uniqueTag');
    expect(await this.getUniqueTagInput()).to.match(/uniqueTag/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTradeDateInput('01-01-2001');
    expect(await this.getTradeDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setSideInput('side');
    expect(await this.getSideInput()).to.match(/side/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQuantityInput('5');
    expect(await this.getQuantityInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setProductIdInput('productId');
    expect(await this.getProductIdInput()).to.match(/productId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPriceInput('5');
    expect(await this.getPriceInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCurrencyInput('currency');
    expect(await this.getCurrencyInput()).to.match(/currency/);
    await waitUntilDisplayed(this.saveButton);
    await this.setExecutionTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getExecutionTimeInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setPrimaryAccountInput('primaryAccount');
    expect(await this.getPrimaryAccountInput()).to.match(/primaryAccount/);
    await waitUntilDisplayed(this.saveButton);
    await this.setVersusAccountInput('versusAccount');
    expect(await this.getVersusAccountInput()).to.match(/versusAccount/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTraderInput('trader');
    expect(await this.getTraderInput()).to.match(/trader/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
