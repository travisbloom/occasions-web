import React from 'react'

import { FormField, Input, Col, Row, Select, Tooltip, OverlayTrigger, View } from '../'
import STATES from '../../constants/states'

const AddressForm = () => (
    <View>
        <FormField
            autoComplete="address-line1"
            name={'addressLine1'}
            label="Address Line 1"
            component={Input}
        />
        <FormField
            autoComplete="address-line2"
            name={'addressLine2'}
            label="Address Line 2"
            component={Input}
        />
        <Row>
            <Col sm={6} xs={12}>
                <FormField
                    name={'state'}
                    label="State"
                    component={Select}
                    options={STATES}
                />
            </Col>
            <Col sm={3} xs={6}>
                <FormField
                    autoComplete="postal-code"
                    name={'postalCode'}
                    label="Zip Code"
                    component={Input}
                />
            </Col>
            <Col sm={3} xs={6}>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id="onlyUS">
                            Occasions is currently only available in the US.
                        </Tooltip>
                    }
                >
                    <FormField
                        isNotReduxForm
                        name={'country'}
                        disabled
                        label="Country"
                        component={Input}
                        defaultValue="USA"
                    />
                </OverlayTrigger>
            </Col>
        </Row>
    </View>
)

export default AddressForm
