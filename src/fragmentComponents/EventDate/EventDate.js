import moment from 'moment'
import React from 'react'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'

import { FormattedDate } from '../../components'

const fragment = gql`
    fragment EventDate on EventNode {
        dateStart
        timeStart
        isReoccuringYearly
    }
`

class EventDate extends React.Component {
    static propTypes = {
        event: propType(fragment).isRequired,
    };


    render() {
        const { event: { isReoccuringYearly, timeStart, dateStart } } = this.props
        if (isReoccuringYearly) {
            if (timeStart) {
                // TODO
                return null
            }
            return <span><FormattedDate date={dateStart} format={'MMM Do'} /></span>
        }
        if (timeStart) {
            // TODO
            return null
        }
        return <span><FormattedDate date={dateStart} format={'MMM Do, \'YY'} /></span>
    }
}

EventDate.fragments = {
    event: fragment,
}

export default EventDate
