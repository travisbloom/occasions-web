// @flow

import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import moment from 'moment'
import { compose, withApollo } from 'react-apollo'

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
import { searchRelationshipTypes } from '../../utilities/search'

import validate from './validate'

class PersonInfoPage extends React.Component {
    birthdayYearOptions: Array<{ label: number, value: number }>
    genderOptions: Array<{ label: string, value: string }>

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
        this.genderOptions = [
            { label: 'Male', value: 'MALE' },
            { label: 'Female', value: 'FEMALE' },
        ]
    }

    onSubmit = () => this.props.history.push(`${urls.createPerson()}/address/0`)

    render() {
        const { handleSubmit, submitting, pristine, genderValue, client } = this.props

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <View marginChildren data-e2e="person-info-page">
                    <Header size="largest">Add A New Friend</Header>
                    <Row>
                        <Col xs={12} sm={6}>
                            <ReduxFormField
                                data-e2e="input-first-name"
                                label="First Name"
                                name="firstName"
                                component={TextInput}
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <ReduxFormField
                                data-e2e="input-last-name"
                                label="Last Name"
                                name="lastName"
                                component={TextInput}
                            />
                        </Col>
                        <Col xs={12}>
                            <ReduxFormField
                                data-e2e="input-email"
                                label="Email"
                                type="email"
                                name="email"
                                component={TextInput}
                            />
                        </Col>
                        <Col xs={12}>
                            <ReduxFormField
                                data-e2e="input-gender"
                                label="Gender"
                                name="gender"
                                component={Select}
                                options={this.genderOptions}
                            />
                        </Col>
                    </Row>
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
                    <ReduxFormField
                        key={`RELATION_SELECT_${genderValue ? genderValue.value : 'DISABLED'}`}
                        data-e2e="input-relationship-type"
                        label="Relation"
                        name="relationshipType"
                        component={Select}
                        disabled={!genderValue}
                        loadOptions={searchRelationshipTypes(client, {
                            gender: genderValue && genderValue.value,
                        })}
                    />
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

const selector = formValueSelector('CreatePersonForm')
export default compose(
    withApollo,
    reduxForm({
        validate,
        destroyOnUnmount: false,
        form: 'CreatePersonForm',
    }),
    connect(state => ({
        genderValue: selector(state, 'gender'),
    })),
)(PersonInfoPage)
