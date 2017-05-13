// @flow

import React from 'react'
import { reduxForm } from 'redux-form'
import moment from 'moment'
import { compose } from 'react-apollo'

import urls from '../../urls'
import {
    Header,
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
    birthdayYearOptions: Array<{ label: number, value: number }>

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

    onSubmit = () => this.props.history.push(`${urls.createPerson()}/address/0`)

    render() {
        const { handleSubmit, submitting, pristine } = this.props

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <View marginChildren data-e2e="person-info-page">
                    <Header size="largest">Add A New Friend</Header>
                    <ReduxFormField
                        data-e2e="input-first-name"
                        label="First Name"
                        name="firstName"
                        component={TextInput}
                    />
                    <ReduxFormField
                        data-e2e="input-last-name"
                        label="Last Name"
                        name="lastName"
                        component={TextInput}
                    />
                    <ReduxFormField
                        data-e2e="input-email"
                        label="Email"
                        type="email"
                        name="email"
                        component={TextInput}
                    />
                    <Row>
                        <Col xs={12}>{"When's"} their birthday?</Col>
                        <Col xs={6}>
                            <ReduxFormField
                                hasNoYear
                                data-e2e="input-birth-date"
                                label="Month and Day"
                                name="birthdayDate"
                                component={DatePicker}
                            />
                        </Col>
                        <Col xs={6}>
                            <ReduxFormField
                                label="Year"
                                data-e2e="input-birth-date-year"
                                name="birthdayYear"
                                component={Select}
                                options={this.birthdayYearOptions}
                            />
                        </Col>
                    </Row>

                    <Button
                        disabled={submitting || pristine}
                        bsStyle="primary"
                        type="submit"
                        data-e2e="submit"
                    >
                        Add Contact
                    </Button>
                </View>
            </form>
        )
    }
}

export default compose(
    reduxForm({
        validate,
        destroyOnUnmount: false,
        form: 'CreatePersonForm',
    }),
)(PersonInfoPage)
