import React from 'react'
import { noop } from 'lodash'

import { ReduxFormField, TextInput, Col, Row, Select, Tooltip, OverlayTrigger, View, FormField } from '../'
import STATES from '../../constants/states'

const AddressForm = () => (
    <View>
        <ReduxFormField
            autoComplete="address-line1"
            name={'streetAddressLine1'}
            label="Address Line 1"
            component={TextInput}
        />
        <ReduxFormField
            autoComplete="address-line2"
            name={'streetAddressLine2'}
            label="Address Line 2"
            component={TextInput}
        />
        <Row>
            <Col sm={6} xs={12}>
                <ReduxFormField
                    name={'state'}
                    label="State"
                    component={Select}
                    options={STATES}
                />
            </Col>
            <Col sm={6} xs={12}>
                <ReduxFormField
                    autoComplete="city"
                    name={'city'}
                    label="City"
                    component={TextInput}
                />
            </Col>
            <Col xs={6}>
                <ReduxFormField
                    autoComplete="postal-code"
                    name={'postalCode'}
                    label="Zip Code"
                    component={TextInput}
                />
            </Col>
            <Col xs={6}>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id="onlyUS">
                            Occasions is currently only available in the US.
                        </Tooltip>
                    }
                >
                    <FormField label="Country">
                        <TextInput value="USA" disabled onChange={noop} />
                    </FormField>
                </OverlayTrigger>
            </Col>
        </Row>
    </View>
)

export default AddressForm
