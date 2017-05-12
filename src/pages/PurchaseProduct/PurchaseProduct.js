// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import DocumentTitle from 'react-document-title'

import { View, Header, Placeholder } from '../../components'
import withApolloFetchingContainer from '../../hoc/withApolloFetchingContainer'

import PurchaseProductForm from './PurchaseProductForm'
import graphqlQuery from './PurchaseProductQuery.graphql'

class PurchaseProduct extends React.Component {
    render() {
        const { data: { associatedEvent, product, currentUser, refetch }, style } = this.props
        return (
            <DocumentTitle
                title={
                    'Occasions | Gift for ' +
                        `${associatedEvent.receivingPerson.fullName} - ` +
                        `${associatedEvent.event.name}`
                }
            >
                <View style={style} padding>
                    <Header size="largest">{product.name}</Header>
                    <Header size="larger">
                        For {associatedEvent.receivingPerson.fullName}
                    </Header>
                    <View marginTop>
                        <PurchaseProductForm
                            initialValues={{
                                receivingPersonId: associatedEvent.receivingPerson.id,
                                productId: product.id,
                                productNotes: '',
                                associatedEventId: associatedEvent.id,
                            }}
                            refetch={refetch}
                            associatedEvent={associatedEvent}
                            product={product}
                            currentUser={currentUser}
                        />
                    </View>
                </View>
            </DocumentTitle>
        )
    }
}

export default compose(
    graphql(graphqlQuery, {
        options: ({ match: { params: { associatedEventId, productId } } }) => ({
            variables: { associatedEventId, productId },
        }),
    }),
    withApolloFetchingContainer(
        () => (
            <View padding>
                <Header size="largest"><Placeholder /></Header>
                <Header size="larger"><Placeholder /></Header>
                <View marginTop>
                    <PurchaseProductForm.Shell />
                </View>
            </View>
        ),
        { fullPage: true },
    ),
)(PurchaseProduct)
