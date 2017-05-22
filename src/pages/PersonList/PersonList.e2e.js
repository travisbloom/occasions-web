import { getNightmare, el } from '../../test/nightmare'
import urls from '../../urls'

describe('PersonList', () => {
    let nightmare = null
    beforeEach(() => {
        nightmare = getNightmare()
    })
    it('should load', () =>
        nightmare.goto(`http://localhost:8080${urls.personList()}`).wait(el('person-link-0')).end())
})
