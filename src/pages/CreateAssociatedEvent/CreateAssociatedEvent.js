// @flow
import React from 'react'
import DocumentTitle from 'react-document-title'

import { View } from '../../components'

import AssignReceivingPersonPage from './AssignReceivingPersonPage'
import CreateEventPage from './CreateEventPage'
import ConfirmationPage from './ConfirmationPage'

class CreateAssociatedEvent extends React.Component {
    state = { page: 1 }

    nextPage = () => this.setState({ page: this.state.page + 1 })

    previousPage = () => this.setState({ page: this.state.page - 1 })

    renderPage = () => {
        const { page } = this.state
        switch (page) {
        case 1:
            return <AssignReceivingPersonPage onSubmit={this.nextPage} />
        case 2:
            return <CreateEventPage onSubmit={this.nextPage} />
        }
        return <ConfirmationPage />
    }

    renderBackLanguage = () => {
        const { page } = this.state
        switch (page) {
        case 1:
            return null
        case 2:
            return 'Select Receiving Person'
        }
        return 'Select Event'
    }

    render() {
        return (
            <DocumentTitle title="Occasions | Create Event">
                <View>
                    {this.renderPage()}
                </View>
            </DocumentTitle>
        )
    }
}

export default CreateAssociatedEvent
