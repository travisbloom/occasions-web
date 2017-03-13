import React from 'react'
import classNames from 'classnames'
import { random } from 'lodash'

import { View } from '../'

import styles from './Placeholder.scss'

class Placeholder extends React.Component {
    constructor(props) {
        super(props)
        this.width = props.width || random(0.8, 1) * 100
    }
    render() {
        const { light, width, children } = this.props
        return (
            <View
                inline
                className={classNames(styles.base, light && styles.light)}
                style={{ width: `${width || this.width}%` }}
            >
                <View className={styles.text}>{children || '\u00A0'}</View>
            </View>
        )
    }
}

export default Placeholder
