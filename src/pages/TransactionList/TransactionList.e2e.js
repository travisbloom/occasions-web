import {getNightmare, el} from '../../test/nightmare';
import urls from '../../urls';

describe('TransactionList', () => {
  let nightmare = null;
  beforeEach(() => {
    nightmare = getNightmare();
  });
  it('should load', () =>
    nightmare
      .goto(`http://localhost:8080${urls.transactionList()}`)
      .wait(el('transaction-link-0'))
      .end());
});
