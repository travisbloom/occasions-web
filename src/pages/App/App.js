import React from 'react'
import { RouteTransition } from 'react-router-transition'
import presets from 'react-router-transition/src/presets'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { View, Navbar } from '../../components'

class App extends React.Component {

    mapStyles = styles => ({
        ...styles,
        position: 'absolute',
        height: '100%',
        width: '100%',
    })

    slideRight = styles => this.mapStyles(presets.slideRight.mapStyles(styles))

    slideLeft = styles => this.mapStyles(presets.slideLeft.mapStyles(styles))

    render() {
        const { children, location, data: { currentUser } } = this.props

        return (
            <View>
                <Navbar currentUser={currentUser} />
                {children}
            </View>
        )
    }
}

const query = gql`
query Home {
currentUser {
    person {
      fullName
    }
  }
}
`

export default graphql(query)(App)
