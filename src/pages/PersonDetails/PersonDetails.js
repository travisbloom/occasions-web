// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import DocumentTitle from 'react-document-title'

import {
    View,
    Table,
    Panel,
    FormattedDate,
    Header,
    Button,
    PanelGroup,
    Placeholder,
    LinkContainer,
} from '../../components'
import { EventDate } from '../../fragmentComponents'
import urls from '../../urls'
import withShell from '../../hoc/withShell'
import type { PersonDetailsQuery } from '../../types/schema'

import graphqlQuery from './PersonDetailsQuery.graphql'

const LineItem = ({ label, children }) => (
    <tr>
        <td>{label}</td>
        <td>{children}</td>
    </tr>
)

class PersonDetails extends React.Component {
    props: {
        data: PersonDetailsQuery,
    }
    render() {
        const { data: { person } } = this.props
        return (
            <DocumentTitle title={`Occasions | ${person.fullName}`}>
                <View tabsContainer marginChildren padding data-e2e="page-person-details">
                    <Header size="largest">{person.fullName}</Header>
                    <Table>
                        <tbody>
                            <LineItem label="Added On">
                                <FormattedDate date={person.birthDate} showYear />
                            </LineItem>
                            <LineItem label="Birthday">
                                <FormattedDate date={person.birthDate} showYear />
                            </LineItem>
                            <LineItem label="Email">{person.email}</LineItem>
                        </tbody>
                    </Table>
                    <PanelGroup defaultActiveKey="Upcoming Occasions" accordion>
                        <Panel header="Upcoming Occasions" eventKey="Upcoming Occasions">
                            <View marginChildren>
                                {person.receivedEvents.edges.length
                                    ? person.receivedEvents.edges.map(({ node }) => (
                                        <LinkContainer
                                            key={node.id}
                                            to={urls.associatedEventDetails(node.id)}
                                        >
                                            <Panel header={<EventDate event={node.event} />}>
                                                {node.event.name}
                                            </Panel>
                                        </LinkContainer>
                                      ))
                                    : <Button>Create New Occassion</Button>}
                            </View>
                        </Panel>
                        <Panel header="Previous Gifts" eventKey="Previous Gifts">
                            {person.transactions.edges.length
                                ? <View marginChildren>
                                    {person.receivedEvents.edges.map(({ node }) => (
                                        <Panel key={node.id}>{node.event.name}</Panel>
                                      ))}
                                </View>
                                : null}
                        </Panel>
                    </PanelGroup>
                </View>
            </DocumentTitle>
        )
    }
}

const PersonDetailsShell = () => (
    <View tabsContainer marginChildren padding data-e2e="page-person-details">
        <Header size="largest"><Placeholder /></Header>
        <Table>
            <tbody>
                <LineItem label={<Placeholder />}>
                    <Placeholder />
                </LineItem>
                <LineItem label={<Placeholder />}>
                    <Placeholder />
                </LineItem>
                <LineItem label={<Placeholder />}><Placeholder /></LineItem>
            </tbody>
        </Table>
        <PanelGroup defaultActiveKey="Upcoming Occasions" accordion>
            <Panel header={<Placeholder />} eventKey="Upcoming Occasions">
                {new Array(4).fill().map((_, index) => (
                    <Panel key={index} title={<Placeholder />}>
                        <Placeholder />
                    </Panel>
                ))}
            </Panel>
            <Panel header={<Placeholder />} eventKey="Previous Gifts" />
        </PanelGroup>
    </View>
)

export default compose(
    graphql(graphqlQuery, {
        options: ({ match: { params: { personId } } }) => ({
            variables: { personId },
        }),
    }),
    withShell({
        shell: PersonDetailsShell,
        isLoaded: ({ data }) => data.person.receivedEvents,
    }),
)(PersonDetails)
