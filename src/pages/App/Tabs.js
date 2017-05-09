// @flow
import React from 'react'
import classNames from 'classnames'

import { View, Row, Col, Icon, Link } from '../../components'
import urls from '../../urls'

import styles from './Tabs.scss'

const TAB_OPTIONS = [
    {
        url: urls.associatedEventsList(),
        icon: 'calendar',
    },
    {
        url: urls.personList(),
        icon: 'user',
    },
    {
        url: urls.associatedEventsList(),
        icon: 'home',
    },
]

class Tabs extends React.Component {
    static height: number
    render() {
        return (
            <View className={classNames(styles.base)}>
                <Row>
                    {TAB_OPTIONS.map(({ url, icon }) => (
                        <Col xs={4} className={classNames(styles.tab)} key={icon}>
                            <Link to={url}>
                                <Icon type={icon} />
                            </Link>
                        </Col>
                    ))}
                </Row>
            </View>
        )
    }
}

Tabs.height = 60

export default Tabs
