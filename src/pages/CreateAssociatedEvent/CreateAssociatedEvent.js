// @flow
import React from 'react'

import { View, Link } from '../../components'

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
            return (
                <AssignReceivingPersonPage onSubmit={this.nextPage} />
            )
        case 2:
            return (
                <CreateEventPage onSubmit={this.nextPage} />
            )
        }
        return <ConfirmationPage />
    }

    renderBackLanguage = () => {
        const { page } = this.state
        switch (page) {
        case 1: return null
        case 2: return 'Select Receiving Person'
        }
        return 'Select Event'
    }

    render() {
        const {

            style,
        } = this.props

        return (
            <View style={style} padding >
                <View>
                    <Link onClick={this.previousPage}>{this.renderBackLanguage()}</Link>
                </View>
                {this.renderPage()}
            </View>
        )
    }
}

export default CreateAssociatedEvent
