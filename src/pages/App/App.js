import React from 'react'
import { RouteTransition } from 'react-router-transition'
import presets from 'react-router-transition/src/presets'

import { View } from '../../components'

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
        const { children, location } = this.props

        return children
    }
}

export default App
