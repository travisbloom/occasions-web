// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import DocumentTitle from 'react-document-title'

import { View, Header, Placeholder } from '../../components'
import withShell from '../../hoc/withShell'

import PurchaseProductForm from './PurchaseProductForm'
import graphqlQuery from './PurchaseProductQuery.graphql'

class PurchaseProduct extends React.Component {
    render() {
        const {
            data: {
                associatedEvent,
                product,
                currentUser,
                refetch,
            },
            style,
        } = this.props
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
                    <PurchaseProductForm
                        initialValues={{
                            receivingPersonId: associatedEvent.receivingPerson.pk,
                            productId: product.slug,
                            productNotes: '',
                            associatedEventId: associatedEvent.pk,
                        }}
                        refetch={refetch}
                        associatedEvent={associatedEvent}
                        product={product}
                        currentUser={currentUser}
                    />
                </View>
            </DocumentTitle>
        )
    }
}

PurchaseProduct.Shell = () => (
    <View padding>
        <Header size="largest"><Placeholder /></Header>
        <Header size="larger"><Placeholder /></Header>
        <PurchaseProductForm.Shell />
    </View>
)

export default compose(
    graphql(graphqlQuery, {
        options: ({ match: { params: { associatedEventId, productSlug } } }) => ({
            variables: { associatedEventId, productSlug },
        }),
    }),
    withShell({ isLoaded: props => props.data.associatedEvent.receivingPerson }),
)(PurchaseProduct)
