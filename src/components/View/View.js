import React from 'react'
import { isBoolean } from 'lodash'
import classNames from 'classnames'

import styles from './View.scss'
import styleVars from '../../styles'


const toSpacingValue = (type) => {
    const usedType = isBoolean(type) ? 'medium' : type
    switch (usedType) {
    case ('small') : return `${styleVars.spacingSmall}px`
    case ('medium') : return `${styleVars.spacing}px`
    case ('large'): return `${styleVars.spacingLarge}px`
    default: return null
    }
}


const generateStyes = ({ margin, padding, style, inline }) => {
    if (!margin && !padding && !inline) return style
    return {
        ...style,
        display: inline ? 'inline-block' : 'inherit',
        margin: toSpacingValue(margin) || style.margin,
        padding: toSpacingValue(padding) || style.padding,
    }
}

const View = ({ inline, className, margin, marginChildren, padding, style, children, ...props }) => {
    const generatedStyleObj = generateStyes({ margin, padding, style, inline })
    return React.createElement(
        inline ? 'span' : 'div',
        {
            style: generatedStyleObj,
            className: classNames(
                marginChildren && styles.marginChildren,
                className,
            ),
            ...props,
        },
        children,
    )
}

View.defaultProps = {
    style: {},
}


export default View
