// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { View, Header, LoadingPanel } from '../../components'

import CreatePersonForm from './CreatePersonForm'

class CreatePerson extends React.Component {

    render() {
        const {
            data: {
                currentUser,
            },
        } = this.props

        if (!currentUser) return <span>allllmost</span>
        return (
            <View padding>
                <Header size="largest">Add A New Friend</Header>
                {currentUser ?
                    <CreatePersonForm
                        currentUser={currentUser}
                    /> :
                    <LoadingPanel />
                }
            </View>
        )
    }
}

const query = gql`
query CreatePerson {
    currentUser {
      id
      person {
        id
        fullName
      }
    }
}
`

export default graphql(query)(CreatePerson)
