// @flow
import * as React from 'react';
import classNames from 'classnames'

import { View, Row, Col, Icon, LinkContainer, Grid } from '../../components'
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
        url: urls.transactionList(),
        icon: 'gift',
    },
]

class Tabs extends React.Component<{}> {
    static height: number
    render() {
        return (
            <View className={classNames(styles.base)}>
                <Grid>
                    <Row>
                        {TAB_OPTIONS.map(({ url, icon }) => (
                            <LinkContainer to={url} key={icon}>
                                <Col xs={4}>
                                    <View className={classNames(styles.tab)}>
                                        <Icon type={icon} />
                                    </View>
                                </Col>
                            </LinkContainer>
                        ))}
                    </Row>
                </Grid>
            </View>
        )
    }
}

Tabs.height = 60

export default Tabs
