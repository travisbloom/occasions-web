/* @flow */
//  This file was automatically generated and should not be edited.

export type CreateAssociatedLocationInput = {
    personId: string,
    location: CreateLocationInput,
    clientMutationId: string,
}

export type CreateLocationInput = {
    streetAddressLine1: string,
    streetAddressLine2: string,
    postalCode: string,
    city: string,
    state: string,
}

export type CreateAssociatedEventInput = {
    event: CreateEventInput,
    eventId: string,
    receivingPersonId: string,
    clientMutationId: string,
}

export type CreateEventInput = {
    eventTypes: Array<string>,
    name: string,
    dateStart: String,
    timeStart: String,
}

export type CreateStripeUserInput = {
    stripTransactionId: string,
    email: string,
    clientMutationId: string,
}

export type CreateTransactionInput = {
    productId: string,
    associatedEventId: string,
    associatedLocationId: string,
    receivingPersonId: string,
    productNotes: string,
    clientMutationId: string,
}

export type CreateUserInput = {
    username: string,
    password: string,
    clientMutationId: string,
}

export type EventCatalogQueryQuery = {
    eventTypes: {
        edges: Array<{
            node: {
                id: string,
                displayName: string,
            },
        }>,
    },
}

export type EventListQueryQueryVariables = {
    eventSearchValue: string,
    eventTypes: Array<string>,
}

export type EventListQueryQuery = {
    events: {
        edges: Array<{
            node: {
                id: string,
                name: string,
                slug: string,
                dateStart: String,
                timeStart: String,
                isReoccuringYearly: boolean,
            },
        }>,
    },
}

export type CreateAssociatedLocationMutationMutationVariables = {
    input: CreateAssociatedLocationInput,
}

export type CreateAssociatedLocationMutationMutation = {
    createAssociatedLocation: {
        associatedLocation: {
            id: string,
            location: {
                id: string,
                displayName: string,
            },
        },
    },
}

export type AppQuery = {
    currentUser: {
        id: string,
        person: {
            id: string,
            fullName: string,
        },
    },
}

export type AssociatedEventDetailsQueryVariables = {
    associatedEventId: string,
}

export type AssociatedEventDetailsQuery = {
    associatedEvent: {
        id: string,
        receivingPerson: {
            id: string,
            fullName: string,
        },
        transactions: {
            edges: Array<{
                node: {
                    id: string,
                    costUsd: number,
                    product: {
                        id: string,
                        name: string,
                        mainImageUrl: string,
                        description: string,
                    },
                },
            }>,
        },
        event: {
            id: string,
            name: string,
            dateStart: String,
            timeStart: String,
            isReoccuringYearly: boolean,
            relatedProducts: {
                edges: Array<{
                    node: {
                        name: string,
                        description: string,
                        id: string,
                        slug: string,
                    },
                }>,
            },
        },
    },
}

export type AssociatedEventsListQuery = {
    currentUser: {
        id: string,
        person: {
            id: string,
            fullName: string,
            createdEvents: {
                edges: Array<{
                    node: {
                        id: string,
                        receivingPerson: {
                            id: string,
                            fullName: string,
                        },
                        transactions: {
                            edges: Array<{
                                node: {
                                    id: string,
                                },
                            }>,
                        },
                        event: {
                            id: string,
                            name: string,
                            dateStart: String,
                            timeStart: String,
                            isReoccuringYearly: boolean,
                        },
                    },
                }>,
            },
        },
    },
}

export type CreateAssociatedEventMutationVariables = {
    input: CreateAssociatedEventInput,
}

export type CreateAssociatedEventMutation = {
    createAssociatedEvent: {
        associatedEvent: {
            id: string,
            creatingPerson: {
                fullName: string,
            },
            receivingPerson: {
                fullName: string,
            },
            event: {
                name: string,
            },
        },
    },
}

export type CreatePersonQuery = {
    currentUser: {
        id: string,
        person: {
            id: string,
            fullName: string,
        },
    },
}

export type CreateStripeUserMutationVariables = {
    input: CreateStripeUserInput,
}

export type CreateStripeUserMutation = {
    createStripeUser: {
        user: {
            hasStripeUser: boolean,
        },
    },
}

export type CreateTransactionMutationVariables = {
    input: CreateTransactionInput,
}

export type CreateTransactionMutation = {
    createTransaction: {
        transaction: {
            id: string,
            costUsd: number,
            product: {
                id: string,
                name: string,
            },
            associatedLocation: {
                id: string,
                location: {
                    id: string,
                    displayName: string,
                },
            },
            stripeTransactionId: string,
            productNotes: string,
        },
    },
}

export type PurchaseProductQueryVariables = {
    associatedEventId: string,
    productId: string,
}

export type PurchaseProductQuery = {
    currentUser: {
        email: string,
        hasStripeUser: boolean,
        id: string,
        person: {
            id: string,
            fullName: string,
        },
    },
    associatedEvent: {
        id: string,
        receivingPerson: {
            fullName: string,
            id: string,
            associatedLocations: {
                edges: Array<{
                    node: {
                        id: string,
                        location: {
                            id: string,
                            displayName: string,
                        },
                    },
                }>,
            },
        },
        event: {
            name: string,
            id: string,
            dateStart: String,
            timeStart: String,
            isReoccuringYearly: boolean,
        },
    },
    product: {
        name: string,
        id: string,
        slug: string,
        costUsd: number,
        description: string,
        eventTypes: {
            edges: Array<{
                node: {
                    id: string,
                    name: string,
                    displayName: string,
                },
            }>,
        },
    },
}

export type CreateUserMutationVariables = {
    input: CreateUserInput,
}

export type CreateUserMutation = {
    createUser: {
        user: {
            email: string,
        },
    },
}

export type TransactionDetailsQueryVariables = {
    transactionId: string,
}

export type TransactionDetailsQuery = {
    transaction: {
        id: string,
        datetimeCreated: String,
        receivingPerson: {
            id: string,
            fullName: string,
        },
        costUsd: number,
        product: {
            id: string,
            name: string,
            description: string,
            mainImageUrl: string,
        },
        associatedEvent: {
            id: string,
            event: {
                id: string,
                name: string,
                dateStart: String,
                timeStart: String,
                isReoccuringYearly: boolean,
            },
        },
        associatedLocation: {
            id: string,
            location: {
                id: string,
                displayName: string,
            },
        },
        productNotes: string,
    },
}

export type SearchEventTypesQueryQueryVariables = {
    search: string,
}

export type SearchEventTypesQueryQuery = {
    eventTypes: {
        edges: Array<{
            node: {
                id: string,
                displayName: string,
            },
        }>,
    },
}

export type SearchPeopleQueryQueryVariables = {
    value: string,
}

export type SearchPeopleQueryQuery = {
    people: {
        edges: Array<{
            node: {
                id: string,
                fullName: string,
            },
        }>,
    },
}
