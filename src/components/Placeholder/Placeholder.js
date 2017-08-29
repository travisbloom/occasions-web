// @flow
import * as React from 'react'
import classNames from 'classnames'
import { random } from 'lodash'

import { View } from '../'

import styles from './Placeholder.scss'

type Props = {
    width?: number,
}
class Placeholder extends React.Component<Props> {
    width: number
    constructor(props: Props) {
        super(props)
        this.width = props.children || props.width || random(0.8, 1) * 100
    }
    render() {
        const { light, width, children } = this.props
        return (
            <View
                inline
                className={classNames(styles.base, light && styles.light)}
                style={{ width: children ? undefined : `${width || this.width}%` }}
            >
                <View className={styles.text}>{children || '\u00A0'}</View>
            </View>
        )
    }
}

export default Placeholder
