// @flow
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import DocumentTitle from 'react-document-title'

import { View, Button, LinkContainer, Panel, Placeholder } from '../../components'
import urls from '../../urls'
import withApolloFetchingContainer from '../../hoc/withApolloFetchingContainer'
import type { PersonListQuery } from '../../types/schema'

import graphqlQuery from './PersonListQuery.graphql'

class PersonList extends React.Component<{
    data: PersonListQuery,
    renderWhenReady: () => any,
}> {
    renderBody = () => (
        <View marginChildren data-e2e="person-list-page">
            {this.props.data.currentUser.person.fromRelationships.edges.map(({ node }, index) => (
                <LinkContainer
                    data-e2e={`person-link-${index}`}
                    to={urls.personDetails(node.toPerson.id)}
                    key={node.id}
                >
                    <Panel>{node.toPerson.fullName}</Panel>
                </LinkContainer>
            ))}
        </View>
    )
    render() {
        return (
            <DocumentTitle title="Occasions | Relationship Details">
                <View marginChildren>
                    <View>
                        <LinkContainer to={urls.createPerson()}>
                            <Button block bsStyle="primary">
                                Add Contact
                            </Button>
                        </LinkContainer>
                    </View>
                    {this.props.renderWhenReady(this.renderBody)}
                </View>
            </DocumentTitle>
        )
    }
}
export default compose(
    graphql(graphqlQuery),
    withApolloFetchingContainer(() => (
        <View marginChildren>
            {new Array(4).fill().map((_, index) => (
                <Panel key={index}>
                    <Placeholder />
                </Panel>
            ))}
        </View>
    ))
)(PersonList)
