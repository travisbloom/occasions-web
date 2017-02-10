import React from 'react'
import { RouteTransition } from 'react-router-transition'
import presets from 'react-router-transition/src/presets'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'

import { View, Alert, Grid } from '../../components'
import { closeError } from '../../actions/alerts'

import Navbar from './Navbar'
import Tabs from './Tabs'

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
                <View
                    style={{ position: 'fixed', bottom: `${Tabs.height}px`, width: '100%' }}
                    padding
                >
                    {errors.map((err, index) =>
                        <Alert
                            style={{ marginBottom: '10px' }}
                            onDismiss={() => this.props.closeError(index)}
                            bsStyle="danger"
                            key={index}
                        >
                            {err}
                        </Alert>,
                    )}
                </View>
                <Grid style={{ marginTop: `${Navbar.height}px`, marginBottom: `${Tabs.height}px` }}>
                    {children}
                </Grid>
                <Tabs />
            </View>
        )
    }
}

const query = gql`
query App {
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
