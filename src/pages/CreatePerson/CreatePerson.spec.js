import moment from 'moment'
import {
    getNightmare,
    selectReactDatesDay,
    selectReactSelectOption,
    el,
} from '../../test/nightmare'

describe('Load a Page', () => {
    let nightmare = null
    beforeEach(() => {
        nightmare = getNightmare()
    })

    describe('CreatePerson', () => {
        it('should load without error', () =>
            nightmare
                .goto('http://localhost:8080/a/yourContacts/new')
                .wait('[data-e2e="person-info-page"]')
                .type('[data-e2e="input-first-name"]', 'Travis')
                .type('[data-e2e="input-last-name"]', 'Bloom')
                .type('[data-e2e="input-email"]', 'travis@trigga.com')
                .use(selectReactDatesDay(moment(), '[data-e2e="input-birth-date"]'))
                .use(selectReactSelectOption(0, '[data-e2e="input-birth-date-year"]'))
                .click('[data-e2e="submit"]')
                .wait('[data-e2e="add-address-page"]')
                .type('[data-e2e="input-address-line1"]', 'First Address Line 1')
                .type('[data-e2e="input-address-line2"]', 'First Address Line 2')
                .type('[data-e2e="input-city"]', 'First City')
                .use(selectReactSelectOption(0, '[data-e2e="input-state"]'))
                .type('[data-e2e="input-postal-code"]', '10011')
                .click('[data-e2e="submit"]')
                .wait('[data-e2e="confirmation-page"]')
                .click('[data-e2e="add-location"]')
                .wait('[data-e2e="add-address-page"]')
                .type('[data-e2e="input-address-line1"]', 'Second Address Line 1')
                .type('[data-e2e="input-address-line2"]', 'Second Address Line 2')
                .type('[data-e2e="input-city"]', 'Second City')
                .use(selectReactSelectOption(0, '[data-e2e="input-state"]'))
                .type('[data-e2e="input-postal-code"]', '10011')
                .click('[data-e2e="submit"]')
                .wait('[data-e2e="confirmation-page"]')
                .click('[data-e2e="submit"]')
                .wait('[data-e2e="confimation-pge"]')
                .end()
                .then())
    })
})
