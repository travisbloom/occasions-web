// @flow
const APP = '/a'
const signIn = () => '/signIn'
const marketingHome = () => '/welcome'
const associatedEventsList = () => `${APP}/yourEvents`
const associatedEventDetails = (id: string) => `${APP}/yourEvents/${id}`
const createAssociatedEvent = () => `${APP}/yourEvents/new`
const purchaseProduct = (eventId: string, productId: string) =>
    `${APP}/yourEvents/${eventId}/${productId}`
const createPerson = () => `${APP}/yourRelationships/new`
const personList = () => `${APP}/yourRelationships`
const personDetails = (id: string) => `${APP}/yourRelationships/${id}`
const transactionList = () => `${APP}/yourGifts`
const transactionDetails = (id: string) => `${APP}/yourGifts/${id}`

export default {
    signIn,
    associatedEventsList,
    createAssociatedEvent,
    marketingHome,
    associatedEventDetails,
    purchaseProduct,
    personList,
    createPerson,
    personDetails,
    transactionList,
    transactionDetails,
}
