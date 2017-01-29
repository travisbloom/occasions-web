import React from 'react'

import { FormField, Input, Col, Row, Select, Tooltip, OverlayTrigger, View } from '../'
import STATES from '../../constants/states'

const AddressForm = ({ parentName }) => (
    <View>
        <FormField
            autoComplete="address-line1"
            name={`${parentName}.addressLine1`}
            label="Address Line 1"
            component={Input}
        />
        <FormField
            autoComplete="address-line2"
            name={`${parentName}.addressLine2`}
            label="Address Line 2"
            component={Input}
        />
        <Row>
            <Col sm={6}>
                <FormField
                    name={`${parentName}.state`}
                    label="State"
                    component={Select}
                    options={STATES}
                />
            </Col>
            <Col sm={3}>
                <FormField
                    autoComplete="postal-code"
                    name={`${parentName}.postalCode`}
                    label="Zip Code"
                    component={Input}
                />
            </Col>
            <Col sm={3}>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id="onlyUS">
                            Occasions is currently only available in the US.
                        </Tooltip>
                    }
                >
                    <FormField
                        name={`${parentName}.country`}
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
