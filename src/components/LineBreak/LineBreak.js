import React from 'react'
import { StyleSheet, css } from 'aphrodite'

import styleVars from '../../styles'

const LineBreak = ({ className, ...props }) => (
    <hr className={css(styles.base, className)} {...props} />
)
const styles = StyleSheet.create({
    base: {
        borderWidth: '3px',
        borderColor: styleVars.colorInfo,
        maxWidth: '50px',
    },
})

export default LineBreak
