// @flow
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import { compose } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import type { AppQuery } from '../../types/schema'
import * as React from 'react'
import logo from '../../../assets/logo-white.png'
import urls from '../../urls'

type Props = ContextRouter & {|
    currentUser?: $PropertyType<AppQuery, 'currentUser'>,
|}

class AppNav extends React.Component<Props> {
    static height = 60

    logOut = (): void => {
        const { history } = this.props
        history.push(urls.signIn())
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

export default compose(withRouter)(AppNav)
