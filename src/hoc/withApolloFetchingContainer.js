// @flow
import React from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { AnimatedFade, Alert } from '../components'
import { formatApolloErrors } from '../utilities/errors'

const getDisplayName = WrappedComponent =>
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
const IS_LOADING_NETWORK_STATUS = 1

const withApolloFetchingContainer = (
    PlaceholderComponent: ReactComponent<*>,
    { fullPage }: { fullPage?: boolean } = {},
) => (WrappedComponent: ReactComponent<*>) => {
    class WithApolloFetchingContainer extends React.Component {
        static WrappedComponent: ReactComponent<*>
        static propTypes = {
            data: React.PropTypes.shape({
                networkStatus: React.PropTypes.number, //eslint-disable-line
            }).isRequired,
        }

        getRenderedContent = (fn) => {
            const { data: { networkStatus, error } } = this.props
            if (error) {
                const content = (
                    <Alert isHiddenWithoutChildren canBeHidden shouldStackChildren>
                        {formatApolloErrors(error)}
                    </Alert>
                )
                return { content, key: 'alert' }
            }
            if (networkStatus === IS_LOADING_NETWORK_STATUS) {
                return { content: <PlaceholderComponent />, key: 'placeholder' }
            }
            return { content: fn ? fn() : null, key: 'content' }
        }

        renderWhenReady = (fn) => {
            const { content, key } = this.getRenderedContent(fn)
            return (
                <AnimatedFade getKey={() => key}>
                    {content}
                </AnimatedFade>
            )
        }

        render() {
            if (fullPage) {
                return this.renderWhenReady(() => <WrappedComponent {...this.props} />)
            }
            return <WrappedComponent {...this.props} renderWhenReady={this.renderWhenReady} />
        }
    }
    WithApolloFetchingContainer.displayName = `WithApolloFetchingContainer(${getDisplayName(WrappedComponent)})`
    WithApolloFetchingContainer.WrappedComponent = WrappedComponent

    return hoistStatics(WithApolloFetchingContainer, WrappedComponent)
}

export default withApolloFetchingContainer
