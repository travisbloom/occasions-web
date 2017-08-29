import { getNightmare } from '../../test/nightmare'

describe('SignIn', () => {
    let nightmare = null
    beforeEach(() => {
        nightmare = getNightmare()
    })
    it('should sign in a user', () =>
        nightmare
            .goto('http://localhost:8080/signIn')
            .type('[data-e2e="input-email"]', 'travisbloom@gmail.com')
            .type('[data-e2e="input-password"]', 'changeme')
            .click('[data-e2e="submit"]')
            .wait('[data-e2e="page-associated-events-list"]')
            .end()
            .then())
})
