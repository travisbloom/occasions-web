const APP = '/a';
const signIn = () => '/signIn';
const marketingHome = () => '/welcome';
const associatedEventsList = () => `${APP}/yourEvents`;
const associatedEventDetails = id => `${APP}/yourEvents/${id}`;
const createAssociatedEvent = () => `${APP}/yourEvents/new`;
const purchaseProduct = (eventId, productId) =>
  `${APP}/yourEvents/${eventId}/${productId}`;
const createPerson = () => `${APP}/yourRelationships/new`;
const personList = () => `${APP}/yourRelationships`;
const personDetails = id => `${APP}/yourRelationships/${id}`;
const transactionList = () => `${APP}/yourGifts`;
const transactionDetails = id => `${APP}/yourGifts/${id}`;

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
};
