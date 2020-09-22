import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EntryUpdatePage from './entry-update.page-object';

const expect = chai.expect;
export class EntryDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('positionApp.entry.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-entry'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EntryComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('entry-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('entry');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEntry() {
    await this.createButton.click();
    return new EntryUpdatePage();
  }

  async deleteEntry() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const entryDeleteDialog = new EntryDeleteDialog();
    await waitUntilDisplayed(entryDeleteDialog.deleteModal);
    expect(await entryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/positionApp.entry.delete.question/);
    await entryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(entryDeleteDialog.deleteModal);

    expect(await isVisible(entryDeleteDialog.deleteModal)).to.be.false;
  }
}
