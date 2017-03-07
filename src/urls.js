const AUTHENTICATED_ROUTES = '/a'
const signIn = () => '/signIn'
const marketingHome = () => '/welcome'
const associatedEventsList = () => `${AUTHENTICATED_ROUTES}/yourEvents`
const associatedEventDetails = id => `${AUTHENTICATED_ROUTES}/yourEvents/${id}`
const createAssociatedEvent = () => `${AUTHENTICATED_ROUTES}/yourEvents/new`
const purchaseProduct = (eventId, productSlug) => (
    `${AUTHENTICATED_ROUTES}/yourEvents/${eventId}/${productSlug}`
)
const transactionDetails = id => `${AUTHENTICATED_ROUTES}/yourGifts/${id}`
const createPerson = () => `${AUTHENTICATED_ROUTES}/yourContacts/new`

export default {
    signIn,
    associatedEventsList,
    createAssociatedEvent,
    marketingHome,
    associatedEventDetails,
    purchaseProduct,
    transactionDetails,
    createPerson,
}
