// @flow
import moment from 'moment'
import debug from './debug'

const VALID_MOMENT_FORMATS = [moment.ISO_8601, 'YYYY-MM-DD']
export const toMoment = (dateString: string): moment$Moment => {
    let momentObj = moment()

    const isValid = VALID_MOMENT_FORMATS.some(format => {
        momentObj = moment(dateString, format, null, true)
        return momentObj.isValid()
    })
    if (!isValid) {
        debug(`invalid date passed to toMoment: ${dateString}`)
    }
    return momentObj
}
