// @flow
import { ButtonGroup as RBButtonGroup } from 'react-bootstrap'
import React from 'react'
import classNames from 'classnames'

import styles from './ButtonGroup.scss'

const ButtonGroup = ({
    block,
    direction,
    className,
    ...props
}: { block: boolean, direction: 'vertical' | 'horizontal', className: string }) => (
    <RBButtonGroup
        direction={direction}
        block={(block && direction === 'vertical') || undefined}
        className={classNames(
            className,
            block && direction !== 'vertical' && styles.horizontalBlock,
        )}
        {...props}
    />
)

ButtonGroup.defaultProps = {
    ...RBButtonGroup.defaultProps,
    direction: 'horizontal',
}
ButtonGroup.propTypes = RBButtonGroup.propTypes

export default ButtonGroup
