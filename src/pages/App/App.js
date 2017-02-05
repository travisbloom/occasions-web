import React from 'react'
import { RouteTransition } from 'react-router-transition'
import presets from 'react-router-transition/src/presets'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'

import { View, Navbar, Alert } from '../../components'
import { closeError } from '../../actions/alerts'


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
        const { children, location, data: { currentUser }, errors } = this.props

        return (
            <View>
                <Navbar currentUser={currentUser} />
                <View style={{ position: 'fixed', bottom: 0, width: '100%' }} padding>
                    {errors.map((err, index) =>
                        <Alert
                            onDismiss={() => this.props.closeError(index)}
                            bsStyle="danger"
                            key={index}
                        >
                            {err}
                        </Alert>,
                    )}
                </View>
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

export default compose(
    graphql(query),
    connect(({ alerts: { errors } }) => ({ errors }), { closeError }),
)(App)
