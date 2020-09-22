import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TradeComponentsPage from './trade.page-object';
import TradeUpdatePage from './trade-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Trade e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tradeComponentsPage: TradeComponentsPage;
  let tradeUpdatePage: TradeUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    tradeComponentsPage = new TradeComponentsPage();
    tradeComponentsPage = await tradeComponentsPage.goToPage(navBarPage);
  });

  it('should load Trades', async () => {
    expect(await tradeComponentsPage.title.getText()).to.match(/Trades/);
    expect(await tradeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Trades', async () => {
    const beforeRecordsCount = (await isVisible(tradeComponentsPage.noRecords)) ? 0 : await getRecordsCount(tradeComponentsPage.table);
    tradeUpdatePage = await tradeComponentsPage.goToCreateTrade();
    await tradeUpdatePage.enterData();

    expect(await tradeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(tradeComponentsPage.table);
    await waitUntilCount(tradeComponentsPage.records, beforeRecordsCount + 1);
    expect(await tradeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await tradeComponentsPage.deleteTrade();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(tradeComponentsPage.records, beforeRecordsCount);
      expect(await tradeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(tradeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
