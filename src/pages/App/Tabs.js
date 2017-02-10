import React from 'react'
import { StyleSheet, css } from 'aphrodite'

import { View, Row, Col, Icon, Link } from '../../components'
import styleVars from '../../styles'
import urls from '../../urls'

const TAB_OPTIONS = [
    {
        url: urls.associatedEventsList(),
        icon: 'calendar',
    },
    {
        url: urls.purchaseProduct(),
        icon: 'user',
    },
    {
        url: urls.associatedEventsList(),
        icon: 'home',
    },
]

class Tabs extends React.Component {
    render() {
        return (
            <View className={css(styles.base)}>
                <Row>
                    {TAB_OPTIONS.map(({ url, icon }) =>
                        <Col xs={4} className={css(styles.tab)} key={icon}>
                            <Link to={url}>
                                <Icon type={icon} />
                            </Link>
                        </Col>,
                    )}
                </Row>
            </View>
        )
    }
}

Tabs.height = 60

const styles = StyleSheet.create({
    base: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: `${Tabs.height}px`,
        fontSize: '40px',
        padding: '6px 0',
        backgroundColor: styleVars.colorWhite,
        borderTop: `1px solid ${styleVars.colorPrimary}`,
    },
    tab: {
        textAlign: 'center',
    },
})

export default Tabs
