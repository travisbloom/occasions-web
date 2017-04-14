import React from 'react'

import { AnimatedFade } from '../components'

export default ({ isLoaded }) => Component => (props) => {
    let loaded = false
    try {
        loaded = isLoaded(props)
    } catch (e) {}

    return (
        <AnimatedFade getKey={() => (loaded ? 'placeholder' : 'content')}>
            {loaded ? <Component {...props} /> : <Component.Shell {...props} />}
        </AnimatedFade>
    )
}
