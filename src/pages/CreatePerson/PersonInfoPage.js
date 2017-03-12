// @flow

import React from 'react'
import { reduxForm } from 'redux-form'
import moment from 'moment'

import {
    View,
    ReduxFormField,
    TextInput,
    Button,
    DatePicker,
    Select,
    Row,
    Col,
} from '../../components'

import validate from './validate'

class PersonInfoPage extends React.Component {
    constructor(props) {
        super(props)
        const currentYear = moment().year()
        this.birthdayYearOptions = new Array(currentYear - 1920).fill().map((_, index) => {
            const year = currentYear - index
            return {
                label: year,
                value: year,
            }
        })
    }
    render() {
        const { handleSubmit, submitting, pristine } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <View padding>
                    <ReduxFormField label="First Name" name="firstName" component={TextInput} />
                    <ReduxFormField label="Last Name" name="lastName" component={TextInput} />
                    <ReduxFormField label="Email" type="email" name="email" component={TextInput} />
                    <Row>
                        <Col xs={6}>
                            <ReduxFormField
                                label="When's their birthday?"
                                name="birthdayDate"
                                hasNoYear
                                component={DatePicker}
                            />
                        </Col>
                        <Col xs={6}>
                            <ReduxFormField
                                label="Birthday Year"
                                name="birthdayYear"
                                component={Select}
                                options={this.birthdayYearOptions}
                            />
                        </Col>
                    </Row>

                    <Button disabled={submitting || pristine} bsStyle="info" type="submit">
                        Add Contact
                    </Button>
                </View>
            </form>
        )
    }
}

export default reduxForm({
    validate,
    initialValues: {
        associatedLocations: [{}],
    },
    destroyOnUnmount: false,
    form: 'CreatePersonForm',
})(PersonInfoPage)
