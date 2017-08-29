// @flow
import { Label as RBLabel } from 'react-bootstrap'
import React from 'react'
import classNames from 'classnames'

import styles from './Label.scss'

const Label = ({ className, ...props }: { className: string }) => (
    <RBLabel className={classNames(styles.base, className)} {...props} />
)

export default Label
