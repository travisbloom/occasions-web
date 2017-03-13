// @flow
import React from 'react'
import DocumentTitle from 'react-document-title'

import { Header, View, Row, Col, Grid } from '../../components'

import SignInForm from './SignInForm'

class SignIn extends React.Component {
    render() {
        return (
            <DocumentTitle title="Occasions | Sign In">
                <Grid fluid>
                    <Row center="xs" middle="xs">
                        <Col sm={6} xs={12}>
                            <View marginChildren>
                                <Header size="largest">
                                    Welcome to Occasions!
                                </Header>
                                <SignInForm />
                            </View>
                        </Col>
                    </Row>
                </Grid>
            </DocumentTitle>
        )
    }
}

export default SignIn
