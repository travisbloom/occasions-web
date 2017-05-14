import moment from 'moment'
import {
    getNightmare,
    selectReactDatesDay,
    selectReactSelectOption,
    el,
} from '../../test/nightmare'
import urls from '../../urls'

describe('Load a Page', () => {
    let nightmare = null
    beforeEach(() => {
        nightmare = getNightmare()
    })

    describe('CreatePerson', () => {
        it('should successfully create a new person', () =>
            nightmare
                .goto(`http://localhost:8080${urls.createAssociatedEvent()}`)
                .wait(el('assign-receiving-person-page'))
                .use(selectReactSelectOption(0, el('input-receiving-person-id')))
                .click(el('submit'))
                .wait(el('create-event-page'))
                .wait(1000)
                .click(el('submit'))
                .wait(el('page-person-details'))
                .end())
    })
})
