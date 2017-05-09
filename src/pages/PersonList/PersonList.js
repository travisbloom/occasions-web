// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import DocumentTitle from 'react-document-title'

import { View, Button, LinkContainer, Panel, Placeholder } from '../../components'
import urls from '../../urls'
import withShell from '../../hoc/withShell'
import type { PersonListQuery } from '../../types/schema'

import graphqlQuery from './PersonListQuery.graphql'

const List = ({ data: { currentUser: { person: { fromRelationships: { edges } } } } }) => (
    <View marginChildren>
        {edges.map(({ node }) => (
            <LinkContainer to={urls.personDetails(node.toPerson.id)} key={node.id}>
                <Panel>
                    {node.toPerson.fullName}
                </Panel>
            </LinkContainer>
        ))}
    </View>
)

const ListShell = () => (
    <View marginChildren>
        {new Array(4).fill().map((_, index) => <Panel key={index}><Placeholder /></Panel>)}
    </View>
)

const WrappedList = withShell({
    shell: ListShell,
    isLoaded: ({ data }) => data.currentUser.person.fromRelationships,
})(List)

class PersonList extends React.Component {
    props: {
        data: PersonListQuery,
    }
    render() {
        return (
            <DocumentTitle title="Occasions | Relationship Details">
                <View marginChildren padding data-e2e="page-person-list">
                    <View>
                        <LinkContainer to={urls.createPerson()}>
                            <Button block bsStyle="info">Add A Relationship</Button>
                        </LinkContainer>
                    </View>
                    <WrappedList {...this.props} />
                </View>
            </DocumentTitle>
        )
    }
}
export default compose(graphql(graphqlQuery))(PersonList)
