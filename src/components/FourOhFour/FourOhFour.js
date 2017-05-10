import React from 'react'

import { Panel, Button, LinkContainer, Row, View } from '../'
import urls from '../../urls'

const FourOhFour = () => (
    <Row center="xs" middle="xs" style={{ height: 'calc(100vh - 60px)' }}>
        <Panel
            bsStyle="primary"
            header="Whoops, Looks Like This Page Doesnt Exist"
            style={{ textAlign: 'center' }}
        >
            <View style={{ padding: '30px 0' }}>
                <LinkContainer to={urls.associatedEventsList()}>
                    <Button bsStyle="primary" block>
                        Head Back To Your Occasions
                    </Button>
                </LinkContainer>
            </View>

        </Panel>
    </Row>
)

export default FourOhFour
