import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, withRouter } from 'react-router'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import urls from '../../urls'
import { logOut } from '../../actions/user'


class AppNav extends React.Component {

    logOut = () => {
        const { router, logOutUser } = this.props
        logOutUser().then(() => router.push(urls.signIn()))
    }

    render() {
        const { currentUser } = this.props
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Occasions</Link>
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
                            <MenuItem onClick={this.logOut} eventKey={3.1}>Log Out</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default compose(
    withRouter,
    connect(null, { logOutUser: logOut }),
)(AppNav)
