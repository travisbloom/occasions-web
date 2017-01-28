// @flow
import React from 'react'

import { Header } from '../../components'

import SignInForm from './SignInForm'

class SignIn extends React.Component {

    render() {
        return (
            <div>
                <Header size="largest">Welcome to Occasions!</Header>
                <SignInForm />
            </div>
        )
    }
}

export default SignIn
