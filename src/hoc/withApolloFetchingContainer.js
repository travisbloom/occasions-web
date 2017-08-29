// @flow
import * as React from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { AnimatedFade, Alert, View } from '../components'
import { formatGeneralAPIErrors } from '../utilities/errors'

const getDisplayName = (WrappedComponent): string =>
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
const IS_LOADING_NETWORK_STATUS = 1

const withApolloFetchingContainer = (
    PlaceholderComponent: React.ComponentType<any>,
    { fullPage }: { fullPage?: boolean } = {}
) => <Props: {}>(
    WrappedComponent: React.ComponentType<{ renderWhenReady?: (fn: () => any) => any } & Props>
) => {
    class WithApolloFetchingContainer extends React.Component<{
        data: { networkStatus: number, error: any },
    }> {
        static WrappedComponent: React.ComponentType<any>

        getRenderedContent = (fn: () => any) => {
            const { data: { networkStatus, error } } = this.props
            if (error) {
                const content = (
                    <Alert unHideWithChildren canBeHidden stackChildren>
                        {formatGeneralAPIErrors(error)}
                    </Alert>
                )
                return { content, key: 'alert' }
            }
            if (networkStatus === IS_LOADING_NETWORK_STATUS) {
                return { content: <PlaceholderComponent />, key: 'placeholder' }
            }
            return { content: fn(), key: 'content' }
        }

        renderWhenReady = fn => {
            const { content, key } = this.getRenderedContent(fn)
            return (
                <AnimatedFade getKey={() => key}>
                    <View tabsContainer data-foo="bar">
                        {content}
                    </View>
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
    WithApolloFetchingContainer.displayName = `WithApolloFetchingContainer(${getDisplayName(
        WrappedComponent
    )})`
    WithApolloFetchingContainer.WrappedComponent = WrappedComponent

    return hoistStatics(WithApolloFetchingContainer, WrappedComponent)
}

export default withApolloFetchingContainer
