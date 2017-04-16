// @flow
import React from 'react'

import { FormattedDate } from '../../components'

class EventDate extends React.Component {
    render() {
        const { event: { isReoccuringYearly, timeStart, dateStart } } = this.props
        if (isReoccuringYearly) {
            if (timeStart) {
                // TODO
                return null
            }
            return <span><FormattedDate date={dateStart} /></span>
        }
        if (timeStart) {
            // TODO
            return null
        }
        return <span><FormattedDate date={dateStart} showYear /></span>
    }
}

export default EventDate
