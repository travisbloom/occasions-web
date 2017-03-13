// @flow

import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import DocumentTitle from 'react-document-title'

import { View, Link, Header, Placeholder } from '../../components'
import { formatReduxFormErrors } from '../../utilities/errors'

import PersonInfoPage from './PersonInfoPage'
import AddAddressPage from './AddAddressPage'
import ConfirmationPage from './ConfirmationPage'

class CreatePerson extends React.Component {
    state = {
        page: 1,
        addressIndex: 0,
    };

    onAddAddress = () => this.setState(state => ({
        page: 2,
        addressIndex: state.addressIndex + 1,
    }));

    nextPage = () => this.setState({ page: this.state.page + 1 });

    previousPage = () => this.setState({ page: this.state.page - 1 });

    handleSubmit = (values) => {
        const { createPerson, onSuccess } = this.props
        createPerson(values).then(onSuccess).catch(formatReduxFormErrors)
    };

    renderPage = () => {
        const { data: { currentUser } } = this.props
        const { page, addressIndex } = this.state
        if (!currentUser) return <Placeholder />
        switch (page) {
        case 1:
            return <PersonInfoPage onSubmit={this.nextPage} />
        case 2:
            return <AddAddressPage addressIndex={addressIndex} onSubmit={this.nextPage} />
        }
        return <ConfirmationPage onAddAddress={this.onAddAddress} />
    };

    renderBackLanguage = () => {
        const { page } = this.state
        switch (page) {
        case 1:
            return null
        case 2:
            return 'Select Receiving Person'
        }
        return 'Select Event'
    };

    render() {
        const {
            style,
        } = this.props

        return (
            <DocumentTitle title="Occasions | Add Contact">
                <View style={style} padding>
                    <View>
                        <View inline onClick={this.previousPage}>{this.renderBackLanguage()}</View>
                    </View>
                    <Header size="largest">Add A New Friend</Header>
                    {this.renderPage()}
                </View>
            </DocumentTitle>
        )
    }
}

const query = gql`
query CreatePerson {
    currentUser {
      id
      person {
        id
        fullName
      }
    }
}
`

export default compose(graphql(query), withRouter)(CreatePerson)
