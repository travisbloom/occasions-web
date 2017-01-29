const AUTHENTICATED_ROUTES = '/a'
const signIn = () => '/signIn'
const marketingHome = () => '/welcome'
const home = () => `${AUTHENTICATED_ROUTES}/home`

export default {
    signIn,
    home,
    marketingHome,
}
