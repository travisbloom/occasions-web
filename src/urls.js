const AUTHENTICATED_ROUTES = '/a'
const signIn = () => '/signIn'
const marketingHome = () => '/welcome'
const associatedEventsList = () => `${AUTHENTICATED_ROUTES}/yourEvents`
const associatedEventDetails = id => `${AUTHENTICATED_ROUTES}/yourEvents/${id}`
const createAssociatedEvent = () => `${AUTHENTICATED_ROUTES}/yourEvents/new`
const purchaseProduct = (eventId, productId) =>
    `${AUTHENTICATED_ROUTES}/yourEvents/${eventId}/${productId}`
const transactionDetails = id => `${AUTHENTICATED_ROUTES}/yourGifts/${id}`
const createPerson = () => `${AUTHENTICATED_ROUTES}/yourRelationships/new`
const personList = () => `${AUTHENTICATED_ROUTES}/yourRelationships`
const personDetails = id => `${AUTHENTICATED_ROUTES}/yourRelationships/${id}`

export default {
    signIn,
    associatedEventsList,
    createAssociatedEvent,
    marketingHome,
    associatedEventDetails,
    purchaseProduct,
    transactionDetails,
    personList,
    createPerson,
    personDetails,
}
