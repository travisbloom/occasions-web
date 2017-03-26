import React from 'react'
import { propType } from 'graphql-anywhere'

import { FormattedDate } from '../../components'

import graphqlQuery from './EventDateFragment.graphql'

class EventDate extends React.Component {
    static propTypes = {
        event: propType(graphqlQuery).isRequired,
    };

    render() {
        const {
            event: { isReoccuringYearly, timeStart, dateStart },
        } = this.props
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

EventDate.fragments = {
    event: graphqlQuery,
}

export default EventDate
