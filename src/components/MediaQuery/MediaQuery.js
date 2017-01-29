import React from 'react'
import RRMediaQuery from 'react-responsive'

import styleVars from '../../styles'

const getScreenSize = ({ sm, md, lg }) => {
    if (sm) return styleVars.screenSmMin
    if (md) return styleVars.screenMdMin
    if (lg) return styleVars.screenLgMin
    return null
}

const getScreenSizeProps = (...args) => {
    const minWidth = getScreenSize(...args)
    if (minWidth) {
        return { query: `(min-width: ${minWidth}px)` }
    }
    return {}
}

const MediaQuery = ({ xs, sm, md, ...props }) => (
    <RRMediaQuery {...getScreenSizeProps({ xs, sm, md })} {...props} />
)

export default MediaQuery
