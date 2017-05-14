// @flow
import React from 'react'

import { Icon } from '../../components'

import AssociatedEventsList from '../AssociatedEventsList/AssociatedEventsList'
import AssociatedEventDetails from '../AssociatedEventDetails/AssociatedEventDetails'
import PurchaseProduct from '../PurchaseProduct/PurchaseProduct'
import TransactionDetails from '../TransactionDetails/TransactionDetails'
import CreateAssociatedEvent from '../CreateAssociatedEvent/CreateAssociatedEvent'
import CreatePerson from '../CreatePerson/CreatePerson'
import PersonList from '../PersonList/PersonList'
import PersonDetails from '../PersonDetails/PersonDetails'

export default [
    {
        exact: true,
        path: '/a/yourEvents',
        breadcrumb: <Icon type="calendar" />,
        component: AssociatedEventsList,
        routes: [
            {
                breadcrumb: 'New Event',
                path: '/a/yourEvents/new',
                component: CreateAssociatedEvent,
                routes: [],
            },
            {
                exact: true,
                breadcrumb: 'Event Details',
                path: '/a/yourEvents/:associatedEventId',
                component: AssociatedEventDetails,
                routes: [
                    {
                        exact: true,
                        breadcrumb: 'Buy Gift',
                        path: '/a/yourEvents/:associatedEventId/:productId',
                        component: PurchaseProduct,
                        routes: [],
                    },
                ],
            },
        ],
    },
    {
        exact: true,
        breadcrumb: 'Transaction Details',
        path: '/a/yourGifts/:transactionId',
        component: TransactionDetails,
        routes: [],
    },
    {
        exact: true,
        path: '/a/yourRelationships',
        breadcrumb: <Icon type="user" />,
        component: PersonList,
        routes: [
            {
                breadcrumb: 'New Contact',
                path: '/a/yourRelationships/new',
                component: CreatePerson,
                routes: [],
            },
            {
                exact: true,
                breadcrumb: 'Details',
                path: '/a/yourRelationships/:personId',
                component: PersonDetails,
                routes: [],
            },
        ],
    },
]
