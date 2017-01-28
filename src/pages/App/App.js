// @flow

import React from 'react'
import { Grid } from 'react-bootstrap'

class App extends React.Component {

    render() {
        const { children } = this.props
        return (
            <Grid>
                {children}
            </Grid>
        )
    }
}

export default App
