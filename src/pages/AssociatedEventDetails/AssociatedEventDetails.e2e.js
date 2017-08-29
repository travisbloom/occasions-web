import {getNightmare, el} from '../../test/nightmare';
import urls from '../../urls';

describe('AssociatedEventDetails', () => {
  let nightmare = null;
  beforeEach(() => {
    nightmare = getNightmare();
  });
  it('should load', () =>
    nightmare
      .goto(`http://localhost:8080${urls.associatedEventsList()}`)
      .wait(el('associated-event-summary-0'))
      .click(el('associated-event-summary-0'))
      .wait(el('associated-event-details-page'))
      .end());
});
