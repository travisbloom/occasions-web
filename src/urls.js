const AUTHENTICATED_ROUTES = '/a'
const signIn = () => '/signIn'
const marketingHome = () => '/welcome'
const home = () => `${AUTHENTICATED_ROUTES}/home`
const associatedEventDetails = id => `${AUTHENTICATED_ROUTES}/yourEvents/${id}`
const purchaseProduct = (eventId, productSlug) => (
    `${AUTHENTICATED_ROUTES}/yourEvents/${eventId}/${productSlug}`
)

export default {
    signIn,
    home,
    marketingHome,
    associatedEventDetails,
    purchaseProduct,
}
