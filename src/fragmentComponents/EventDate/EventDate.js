// @flow
import * as React from 'react'

import { FormattedDate } from '../../components'

class EventDate extends React.Component<$FlowFixMeProps> {
    render() {
        const { event: { isReoccuringYearly, nextDate }, eventDate } = this.props
        const dateStart = eventDate ? eventDate.dateStart : nextDate.dateStart
        if (isReoccuringYearly) {
            return (
                <span>
                    <FormattedDate date={dateStart} />
                </span>
            )
        }
        return (
            <span>
                <FormattedDate date={dateStart} showYear />
            </span>
        )
    }
}

export default EventDate
