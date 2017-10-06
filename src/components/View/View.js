// @flow
import * as React from 'react'
import { isBoolean } from 'lodash'
import classNames from 'classnames'

import styles from './View.scss'
import styleVars from '../../styles'

type sizes = 'small' | 'medium' | 'large' | boolean

const toSpacingValue = type => {
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

const generateStyes = ({
    marginTop,
    marginBottom,
    margin,
    padding,
    style,
    inline,
    tabsContainer,
}) => {
    const passedStyles = {
        margin: toSpacingValue(margin) || style.margin,
        padding: toSpacingValue(padding) || style.padding,
        marginTop: toSpacingValue(marginTop) || style.marginTop,
        marginBottom: tabsContainer
            ? `${55 + styleVars.spacing}px`
            : toSpacingValue(marginBottom) || style.marginBottom,
        ...style,
    }
    if (inline) {
        passedStyles.display = 'inline-block'
    }
    return passedStyles
}

const View = ({
    inline,
    className,
    margin,
    marginChildrenRight,
    marginChildren,
    marginTop,
    marginBottom,
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
    marginBottom?: sizes,
    padding?: sizes,
    style?: CSSStyleDeclaration | any,
    children?: any,
}) => {
    const generatedStyleObj = generateStyes({
        marginTop,
        marginBottom,
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
                className
            ),
            ...props,
        },
        children
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
    marginBottom: false,
    padding: false,
    children: null,
}

export default View
