// @flow
import React from 'react'

import { Header, View, Row, Col, Grid } from '../../components'

import SignInForm from './SignInForm'

class SignIn extends React.Component {

    render() {
        return (
            <Grid fluid>
                <Row center="xs" middle="xs">
                    <Col sm={6} xs={12}>
                        <View padding>
                            <Header size="largest">Welcome to Occasions!</Header>
                            <SignInForm />
                        </View>
                    </Col>
                </Row>
            </Grid>


        )
    }
}

export default SignIn
