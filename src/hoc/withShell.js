// @flow
import React from 'react'

import { AnimatedFade } from '../components'

type withShellConfig = { isLoaded: any => boolean, shell?: ReactComponent<*> }

export default ({ isLoaded, shell }: withShellConfig) => <Props: {}>(
    Component: ClassComponent<void, Props, void> | FunctionComponent<Props>,
): FunctionComponent<Props> => (props) => {
    let loaded = false
    try {
        loaded = isLoaded(props)
    } catch (e) {}
    const RenderedShell = shell || Component.Shell
    return (
        <AnimatedFade getKey={() => (loaded ? 'placeholder' : 'content')}>
            {loaded ? <Component {...props} /> : <RenderedShell {...props} />}
        </AnimatedFade>
    )
}
