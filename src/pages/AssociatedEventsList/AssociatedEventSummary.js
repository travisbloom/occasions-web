import React from 'react'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'
import { withRouter } from 'react-router'

import { Panel, View } from '../../components'
import urls from '../../urls'

const fragment = gql`
    fragment AssociatedEventSummary on AssociatedEventNode {
        id
        receivingPerson {
          id
          fullName
        }
        transactions {
          edges {
            node {
              id
              costUsd
              product {
                id
                name
                mainImageUrl
                description
              }
            }
          }
        }
        event {
          id
          name
          dateStart
          timeStart
        }
    }
`

class AssociatedEventSummary extends React.Component {
    static propTypes = {
        associatedEvent: propType(fragment).isRequired,
    };

    transitionToDetailsPage = () => {
        const { associatedEvent, router } = this.props
        router.push(urls.associatedEventDetails(associatedEvent.id))
    }

    render() {
        const { associatedEvent } = this.props

        return (
            <Panel
                onClick={this.transitionToDetailsPage}
                header={<View>foo</View>}
            >
                <View>{associatedEvent.receivingPerson.fullName}</View>
                <View>{associatedEvent.event.name} {associatedEvent.event.eventType}</View>
            </Panel>
        )
    }
}

AssociatedEventSummary.fragments = {
    associatedEvent: fragment,
}

export default withRouter(AssociatedEventSummary)
