import {getNightmare, selectReactSelectOption, el} from '../../test/nightmare';
import urls from '../../urls';

describe('PurchaseProduct', () => {
  let nightmare = null;
  beforeEach(() => {
    nightmare = getNightmare();
  });
  it('should successfully create a new transaction', () =>
    nightmare
      .goto(`http://localhost:8080${urls.associatedEventsList()}`)
      .wait(el('associated-event-summary-0'))
      .click(el('associated-event-summary-0'))
      .wait(el('associated-event-details-page'))
      .wait(el('product-link-0'))
      .click(el('product-link-0'))
      .wait(el('page-purchase-product'))
      .use(selectReactSelectOption(0, el('input-associated-location-id')))
      .type(el('input-product-notes'), 'some product notes')
      .click(el('submit'))
      .wait(el('page-transaction-details'))
      .end());
});
