/* eslint-disable no-unused-vars, no-undef */

declare class APP_ENV {
    static stripeClientId: string,
    static appServer: string,
    static clientId: string,
    static clientSecret: string,
}
declare type FunctionComponent<P> = (props: P) => ?React$Element<any>
declare type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>
declare type ReactComponent<P> = FunctionComponent<P> | ClassComponent<*, P, *>

type bsStyle = 'success' | 'warning' | 'danger' | 'info' | 'default' | 'primary' | 'link'
type bsSize = 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest'
