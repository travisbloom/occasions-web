// @flow
import React from 'react'
import type { Children } from 'react'
import { isBoolean } from 'lodash'

import styleVars from '../../styles'

type defaultSizing = 'small' | 'medium' | 'large' | boolean

const toSpacingValue = (type : defaultSizing) => {
    const usedType = isBoolean(type) ? 'medium' : type
    switch (usedType) {
    case ('small') : return `${styleVars.spacingSmall}px`
    case ('medium') : return `${styleVars.spacing}px`
    case ('large'): return `${styleVars.spacingLarge}px`
    default: return null
    }
}


const generateStyes = ({ margin, padding, style }) => {
    if (!margin && !padding) return style
    return {
        ...style,
        margin: toSpacingValue(margin) || style.margin,
        padding: toSpacingValue(padding) || style.padding,
    }
}

type Props = {
    inline: boolean,
    margin: defaultSizing,
    padding: defaultSizing,
    style: Object,
    children: Children
}

const View = ({ inline, margin, padding, style, children, ...props } : Props) => {
    const passedStyles = generateStyes({ margin, padding, style })
    return React.createElement(
        inline ? 'span' : 'div',
        { style: passedStyles, ...props },
        children,
    )
}

View.defaultProps = {
    style: {},
}

export default View
