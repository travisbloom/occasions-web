// @flow
import React from 'react'

import { Header, View, Row, Col } from '../../components'

import SignInForm from './SignInForm'

class SignIn extends React.Component {

    render() {
        const { style } = this.props
        return (
            <Row center="xs" middle="xs" style={{ height: '100vh' }}>
                <Col sm={6}>
                    <View style={style} padding>
                        <Header size="largest">Welcome to Occasions!</Header>
                        <SignInForm />
                    </View>
                </Col>
            </Row>

        )
    }
}

export default SignIn
