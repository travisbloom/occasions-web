// @flow
import React from 'react'
import classNames from 'classnames'
import {
    Header,
    View,
    LineBreak,
    MediaQuery,
    Row,
    Col,
    Icon,
    Grid,
    Button,
    LinkContainer,
} from '../../components'
import { hasAccessToken } from '../../utilities/auth'
import urls from '../../urls'

import styles from './MarketingHome.scss'
import heroImage from './heroImage.jpg'

const CollapsableArrow = () => (
    <Header size="larger">
        <MediaQuery md>
            {matches =>
                matches
                    ? <Icon
                        type="arrow-right"
                        style={{ display: 'inline-block', marginLeft: '8px' }}
                    />
                    : <View margin="large"><Icon type="arrow-down" /></View>}
        </MediaQuery>
    </Header>
)

class MarketingHome extends React.Component {
    constructor(props) {
        super(props)
        this.isLoggedIn = hasAccessToken()
    }

    render() {
        return (
            <View>
                <View
                    style={{ backgroundImage: `url(${heroImage})` }}
                    className={classNames(styles.hero, styles.firstHero)}
                >
                    <LinkContainer
                        to={this.isLoggedIn ? urls.associatedEventsList() : urls.signIn()}
                    >
                        <Button className={classNames(styles.signInLink)} bsStyle="info">
                            {this.isLoggedIn ? 'Home' : 'Sign In'}
                        </Button>
                    </LinkContainer>
                    <View className={classNames(styles.firstHeroContent)}>
                        <Header size="largest">
                            Occasions
                        </Header>
                        <LineBreak />
                        <Header size="larger" style={{ maxWidth: '515px' }}>
                            {
                                'Effortlessly send postcards cards to your friends, loved ones, and family.'
                            }
                        </Header>
                    </View>
                </View>
                <View
                    style={{ backgroundImage: `url(${heroImage})` }}
                    className={classNames(styles.hero, styles.secondHero)}
                >
                    <Grid fluid>
                        <Row between="sm" middle="sm">
                            <Col md={3} xs={12}>
                                <Header size="larger">
                                    Set Important Events
                                </Header>
                            </Col>
                            <Col md={1} xs={12}>
                                <CollapsableArrow />
                            </Col>
                            <Col md={3} xs={12}>
                                <Header size="larger">
                                    {'Get Emailed Beforehand'}
                                </Header>
                            </Col>
                            <Col md={1} xs={12}>
                                <CollapsableArrow />
                            </Col>
                            <Col md={3} xs={12}>
                                <Header size="larger">
                                    {'Send Postcards With One Click'}
                                </Header>
                            </Col>
                        </Row>
                    </Grid>
                </View>
                <View
                    style={{ backgroundImage: `url(${heroImage})` }}
                    className={classNames(styles.hero, styles.firstHero)}
                >
                    <View className={classNames(styles.firstHeroContent)}>
                        <Header size="larger">
                            <View style={{ maxWidth: '515px' }}>
                                <LinkContainer to={urls.signIn()}>
                                    <Button bsSize="large" bsStyle="primary">
                                        {'Sign Up Now'}
                                    </Button>
                                </LinkContainer>
                            </View>
                        </Header>
                    </View>
                </View>
            </View>
        )
    }
}

export default MarketingHome
