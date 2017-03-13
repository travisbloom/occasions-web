import React from 'react'

import { AnimatedFade } from '../components'

export default Component => props => (
    <AnimatedFade getKey={() => props.data.loading ? 'placeholder' : 'content'}>
        {props.data.loading ? <Component.Placeholder {...props} /> : <Component {...props} />}
    </AnimatedFade>
)
