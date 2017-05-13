import React from 'react'
import { Route, matchPath, withRouter } from 'react-router-dom'
import { Motion } from 'data-driven-motion'

import { View } from '../'

const WOBBLY_SPRING = { stiffness: 200, damping: 15, precision: 0.1 }

class AnimatedSwitch extends React.Component {
    getKey = ({ child, location, match }) =>
        child.props.getKey
            ? child.props.getKey({ location, match })
            : child.props.path || child.props.from

    render() {
        const { children } = this.props
        const location = this.props.location
        let match
        let child
        React.Children.forEach(children, (element) => {
            if (match == null) {
                child = element
                match = matchPath(location.pathname, element.props)
            }
        })

        return (
            <Motion
                data={match ? [{ location, match, child }] : []}
                component={<View style={{ position: 'relative', width: '100%' }} />}
                render={(key, data, renderStyles) =>
                    React.cloneElement(data.child, {
                        key,
                        location: data.location,
                        computedMatch: data.match,
                        style: {
                            ...data.child.props.style,
                            transform: !renderStyles.x
                                ? 'inherit'
                                : `translate3d(${-renderStyles.x}%, 0, 0)`,
                            opacity: renderStyles.o,
                        },
                    })}
                getKey={this.getKey}
                onRender={(data, i, spring) => ({
                    x: spring(0, WOBBLY_SPRING),
                    o: spring(1),
                })}
                onRemount={() => ({ x: 5, o: 0 })}
                onUnmount={(_, spring) => ({
                    x: spring(10, WOBBLY_SPRING),
                    o: spring(0),
                })}
            />
        )
    }
}

const AnimatedRoute = ({ component: Component, style, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            <View
                style={{
                    width: '100%',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    ...props.style,
                    ...style,
                }}
            >
                <Component {...props} />
            </View>
        )}
    />
)

export default {
    Route: AnimatedRoute,
    Switch: withRouter(AnimatedSwitch),
}
