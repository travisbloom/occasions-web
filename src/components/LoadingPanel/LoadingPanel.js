import React from 'react'
import { StyleSheet, css } from 'aphrodite'

// import styleVars from '../../styles'
import { Panel } from '../'

const LoadingPanel = ({ className, ...props }) => (
    <Panel className={css(styles.base, className)} {...props} />
)
const styles = StyleSheet.create({
    base: {
        width: '100%',
        height: '400px',
    },
})

export default LoadingPanel
