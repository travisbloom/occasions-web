// @flow
import React from 'react'
import { compose } from 'react-apollo'
import { withRouter, Redirect } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import { View, AnimatedRouter } from '../../components'
import urls from '../../urls'

import AssignReceivingPersonPage from './AssignReceivingPersonPage'
import CreateEventPage from './CreateEventPage'
import ConfirmationPage from './ConfirmationPage'

class CreateAssociatedEvent extends React.Component {
    render() {
        const { receivingPersonIdValue, location } = this.props
        if (!receivingPersonIdValue && location.pathname !== urls.createAssociatedEvent()) {
            return (
                <Redirect path={urls.createAssociatedEvent()} to={urls.createAssociatedEvent()} />
            )
        }
        return (
            <DocumentTitle title="Occasions | Create Event">
                <View>
                    <AnimatedRouter.Switch>
                        <AnimatedRouter.Route
                            exact
                            path={urls.createAssociatedEvent()}
                            component={AssignReceivingPersonPage}
                        />
                        <AnimatedRouter.Route
                            exact
                            path={`${urls.createAssociatedEvent()}/createEvent`}
                            component={CreateEventPage}
                        />
                        <AnimatedRouter.Route
                            exact
                            path={`${urls.createAssociatedEvent()}/confirmation`}
                            component={ConfirmationPage}
                        />
                    </AnimatedRouter.Switch>
                </View>
            </DocumentTitle>
        )
    }
}

const selector = formValueSelector('CreateAssociatedEventForm')
export default compose(
    withRouter,
    reduxForm({
        destroyOnUnmount: true,
        form: 'CreateAssociatedEventForm',
    }),
    connect(state => ({
        receivingPersonIdValue: selector(state, 'receivingPersonId'),
    }))
)(CreateAssociatedEvent)
