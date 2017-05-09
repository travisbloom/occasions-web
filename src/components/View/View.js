// @flow
import React from 'react'
import { isBoolean } from 'lodash'
import classNames from 'classnames'

import styles from './View.scss'
import styleVars from '../../styles'

type sizes = 'small' | 'medium' | 'large'

const toSpacingValue = (type) => {
    const usedType = isBoolean(type) && type ? 'medium' : type
    switch (usedType) {
    case 'small':
        return `${styleVars.spacingSmall}px`
    case 'medium':
        return `${styleVars.spacing}px`
    case 'large':
        return `${styleVars.spacingLarge}px`
    default:
        return null
    }
}

const generateStyes = ({ marginTop, margin, padding, style, inline, tabsContainer }) => ({
    ...style,
    display: inline ? 'inline-block' : 'inherit',
    margin: toSpacingValue(margin) || style.margin,
    padding: toSpacingValue(padding) || style.padding,
    marginTop: toSpacingValue(marginTop) || style.marginTop,
    marginBottom: tabsContainer ? '60px' : style.marginBottom,
})

const View = ({
    inline,
    className,
    margin,
    marginChildrenRight,
    marginChildren,
    marginTop,
    padding,
    style,
    tabsContainer,
    children,
    ...props
}: {
    inline?: boolean,
    className?: string,
    margin?: sizes,
    marginChildren?: boolean,
    marginChildrenRight?: boolean,
    tabsContainer?: boolean,
    marginTop?: sizes,
    padding?: sizes,
    style?: CSSStyleDeclaration | any,
    children?: any,
}) => {
    const generatedStyleObj = generateStyes({
        marginTop,
        margin,
        padding,
        tabsContainer,
        style: style || {},
        inline,
    })
    return React.createElement(
        inline ? 'span' : 'div',
        {
            style: generatedStyleObj,
            className: classNames(
                marginChildren && styles.marginChildren,
                marginChildrenRight && styles.marginChildrenRight,
                className,
            ),
            ...props,
        },
        children,
    )
}

View.defaultProps = {
    style: {},
    inline: false,
    className: '',
    margin: false,
    marginChildren: false,
    marginChildrenRight: false,
    marginTop: false,
    padding: false,
    children: null,
}

export default View
