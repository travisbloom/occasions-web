import Nightmare from 'nightmare'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000

Nightmare.action('focus', function focus(selector, done) {
    this.evaluate_now(
        nestedSelector => {
            document.activeElement.blur()
            const element = document.querySelector(nestedSelector)
            if (!element) {
                throw new Error(`Unable to find element by selector: ${nestedSelector}`)
            }
            element.focus()
        },
        done,
        selector
    )
})

export const el = id => `[data-e2e="${id}"]`

export const getNightmare = () =>
    new Nightmare({
        // openDevTools: {
        //     mode: 'detach',
        // },
        typeInterval: 20,
        dock: true,
        show: true,
    })

// NOTE: if you arent focused on the electron window, this wont work as expected (weird huh?)
export const selectReactDatesDay = (date, reactDatesSelector = '') => {
    const dateSelector = `[aria-label="${date.format('dddd')}, ${date.format('LL')}"]`
    return nightmare => {
        nightmare
            .focus(`${reactDatesSelector} .DateInput__input`)
            .wait(100)
            .wait(dateSelector)
            .click(dateSelector)
    }
}

export const selectReactSelectOption = (optionIndex = 0, reactDatesSelector = '') => nightmare => {
    nightmare
        .mousedown(`${reactDatesSelector} .Select-control`)
        .wait(200)
        .wait(`.Select-menu > div:nth-child(${optionIndex + 1})`)
        .mousedown(`.Select-menu > div:nth-child(${optionIndex + 1})`)
}
