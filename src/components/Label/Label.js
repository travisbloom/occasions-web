import { Label as RBLabel } from 'react-bootstrap'
import { StyleSheet, css } from 'aphrodite'
import React from 'react'

const Label = ({ className, ...props }) => (
    <RBLabel className={css(styles.base, className)} {...props} />
)

const styles = StyleSheet.create({
    base: {
        fontSize: 'inherit',
    },
})

export default Label
