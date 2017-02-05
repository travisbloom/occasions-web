const AUTHENTICATED_ROUTES = '/a'
const signIn = () => '/signIn'
const marketingHome = () => '/welcome'
const home = () => `${AUTHENTICATED_ROUTES}/home`
const associatedEventDetails = id => `${AUTHENTICATED_ROUTES}/yourEvents/${id}`
const purchaseProduct = (eventId, productId) => `${AUTHENTICATED_ROUTES}/yourEvents/${eventId}/${productId}`

export default {
    signIn,
    home,
    marketingHome,
    associatedEventDetails,
    purchaseProduct,
}
