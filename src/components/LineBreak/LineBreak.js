import React from 'react'
import classNames from 'classnames'

import styles from './LineBreak.scss'

const LineBreak = ({ className, ...props }) => (
    <hr className={classNames(styles.base, className)} {...props} />
)

export default LineBreak
