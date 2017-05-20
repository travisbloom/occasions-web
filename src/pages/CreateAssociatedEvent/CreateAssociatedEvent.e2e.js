import moment from 'moment'
import {
    getNightmare,
    selectReactDatesDay,
    selectReactSelectOption,
    el,
} from '../../test/nightmare'
import urls from '../../urls'

const selectReceivingPerson = nightmare =>
    nightmare
        .goto(`http://localhost:8080${urls.createAssociatedEvent()}`)
        .wait(el('assign-receiving-person-page'))
        .use(selectReactSelectOption(0, el('input-receiving-person-id')))
        .click(el('submit'))
        .wait(el('create-event-page'))

const createNewEvent = nightmare =>
    nightmare
        .click(el('toggle-custom-event'))
        .wait(el('create-event-form'))
        .type(el('input-name'), 'Event Name')
        .use(selectReactSelectOption(0, el('input-event-types')))
        .use(selectReactSelectOption(1, el('input-event-types')))
        .use(selectReactDatesDay(moment().startOf('month'), el('input-date-start')))
        .click(el('submit'))
        .wait(el('confirmation-page'))

const selectExistingEvent = nightmare =>
    nightmare.wait(el('option-event-0')).click(el('option-event-0')).wait(el('confirmation-page'))

const submit = nightmare => nightmare.click(el('submit')).wait(el('associated-event-details-page'))

describe('CreatePerson', () => {
    let nightmare = null
    beforeEach(() => {
        nightmare = getNightmare()
    })
    it('should successfully create a new associated event', () =>
        nightmare
            .use(selectReceivingPerson)
            // select an existing and go back to test clearing entered data
            .use(selectExistingEvent)
            .back()
            .wait(el('toggle-custom-event'))
            .use(createNewEvent)
            .use(submit)
            .end())

    it('should successfully create a new associated event using a default event', () =>
        nightmare.use(selectReceivingPerson).use(selectExistingEvent).use(submit).end())
})
