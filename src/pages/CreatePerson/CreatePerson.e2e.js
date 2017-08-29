import moment from 'moment';
import {
  getNightmare,
  selectReactDatesDay,
  selectReactSelectOption,
  el,
} from '../../test/nightmare';
import urls from '../../urls';

const fillOutPersonInfo = () => nightmare =>
  nightmare
    .wait(el('person-info-page'))
    .type(el('input-first-name'), 'Travis')
    .type(el('input-last-name'), 'Bloom')
    .type(el('input-email'), 'travis@trigga.com')
    .use(selectReactSelectOption(0, el('input-gender')))
    .use(selectReactDatesDay(moment(), el('input-birth-date')))
    .use(selectReactSelectOption(0, el('input-birth-date-year')))
    .use(selectReactSelectOption(0, el('input-relationship-type')))
    .click(el('submit'));

const fillOutAddress = num => nightmare =>
  nightmare
    .wait(el('add-address-page'))
    .type(el('input-address-line1'), `${num} Address Line 1`)
    .type(el('input-address-line2'), `${num} Address Line 2`)
    .type(el('input-city'), `${num} City`)
    .use(selectReactSelectOption(0, el('input-state')))
    .type(el('input-postal-code'), '10011')
    .click(el('submit'));

describe('CreatePerson', () => {
  let nightmare = null;
  beforeEach(() => {
    nightmare = getNightmare();
  });
  it('should successfully create a new person', () =>
    nightmare
      .goto(`http://localhost:8080${urls.createPerson()}`)
      .use(fillOutPersonInfo())
      .use(fillOutAddress(1))
      .wait(el('confirmation-page'))
      .click(el('add-location'))
      .use(fillOutAddress(2))
      .wait(el('confirmation-page'))
      .click(el('submit'))
      .wait(el('page-person-details'))
      .end());
});
