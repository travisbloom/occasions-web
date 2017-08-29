// @flow
import * as React from 'react'
import { noop } from 'lodash'

import {
    ReduxFormField,
    TextInput,
    Col,
    Row,
    Select,
    Tooltip,
    OverlayTrigger,
    View,
    FormField,
} from '../'
import STATES from '../../constants/states'

const AddressForm = ({ autoComplete }: {| autoComplete?: boolean |}) => (
    <View marginChildren>
        <ReduxFormField
            autoComplete={autoComplete ? 'address-line1' : undefined}
            data-e2e="input-address-line1"
            name="streetAddressLine1"
            label="Address Line 1"
            component={TextInput}
        />
        <ReduxFormField
            autoComplete={autoComplete ? 'address-line2' : undefined}
            data-e2e="input-address-line2"
            name="streetAddressLine2"
            label="Address Line 2"
            component={TextInput}
        />
        <Row>
            <Col sm={6} xs={12}>
                <ReduxFormField
                    data-e2e="input-state"
                    name="state"
                    label="State"
                    component={Select}
                    options={STATES}
                />
            </Col>
            <Col sm={6} xs={12}>
                <ReduxFormField
                    data-e2e="input-city"
                    autoComplete={autoComplete ? 'city' : undefined}
                    name="city"
                    label="City"
                    component={TextInput}
                />
            </Col>
            <Col xs={6}>
                <ReduxFormField
                    data-e2e="input-postal-code"
                    autoComplete={autoComplete ? 'postal-code' : undefined}
                    name="postalCode"
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

AddressForm.defaultProps = {
    autoComplete: false,
}

export default AddressForm
