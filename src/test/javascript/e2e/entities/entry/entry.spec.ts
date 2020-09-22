import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EntryComponentsPage from './entry.page-object';
import EntryUpdatePage from './entry-update.page-object';
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

describe('Entry e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let entryComponentsPage: EntryComponentsPage;
  let entryUpdatePage: EntryUpdatePage;

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
    entryComponentsPage = new EntryComponentsPage();
    entryComponentsPage = await entryComponentsPage.goToPage(navBarPage);
  });

  it('should load Entries', async () => {
    expect(await entryComponentsPage.title.getText()).to.match(/Entries/);
    expect(await entryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Entries', async () => {
    const beforeRecordsCount = (await isVisible(entryComponentsPage.noRecords)) ? 0 : await getRecordsCount(entryComponentsPage.table);
    entryUpdatePage = await entryComponentsPage.goToCreateEntry();
    await entryUpdatePage.enterData();

    expect(await entryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(entryComponentsPage.table);
    await waitUntilCount(entryComponentsPage.records, beforeRecordsCount + 1);
    expect(await entryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await entryComponentsPage.deleteEntry();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(entryComponentsPage.records, beforeRecordsCount);
      expect(await entryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(entryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
