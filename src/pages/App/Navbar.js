// @flow
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import { withApollo, compose } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import logo from '../../../assets/logo-white.png'
import urls from '../../urls'
import { logOut } from '../../actions/user'

class AppNav extends React.Component {
    logOut = () => {
        const { history, logOutUser, client } = this.props
        logOutUser()
            .then(() => client.networkInterface.setUri(`${APP_ENV.appServer}/graphql_public`))
            .then(() => history.push(urls.signIn()))
    }

    render() {
        const { currentUser } = this.props

        return (
            <Navbar fluid style={{ marginBottom: 0 }}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={urls.associatedEventsList()}>
                            <img alt="Occasions Logo" src={logo} style={{ height: '30px' }} />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavDropdown
                            eventKey={3}
                            title={currentUser ? currentUser.person.fullName : ''}
                            id="main-login-dropdown"
                        >
                            <MenuItem onClick={this.logOut} eventKey={3.1}>
                                Log Out
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

Navbar.height = 60

export default compose(withApollo, withRouter, connect(null, { logOutUser: logOut }))(AppNav)
