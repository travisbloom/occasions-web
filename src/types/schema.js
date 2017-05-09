/* @flow */
//  This file was automatically generated and should not be edited.

export type CreateAssociatedLocationInput = {|
    personId: string,
    location: LocationInput,
    clientMutationId: string,
|}

export type LocationInput = {|
    streetAddressLine1: string,
    streetAddressLine2: string,
    postalCode: string,
    city: string,
    state: string,
|}

export type CreateAssociatedEventInput = {|
    event: CreateEventInput,
    eventId: string,
    receivingPersonId: string,
    clientMutationId: string,
|}

export type CreateEventInput = {|
    eventTypes: Array<string>,
    name: string,
    dateStart: any,
    timeStart: any,
|}

export type CreatePersonInput = {|
    locations: Array<LocationInput>,
    firstName: string,
    lastName: string,
    email: string,
    birthDate: string,
    clientMutationId: string,
|}

export type RelationshipRelationshipType =
    | 'FRIENDS' // friends
    | 'SIBLINGS' // siblings
    | 'PARENT_TO_CHILD' // parent_to_child

export type CreateStripeUserInput = {|
    stripTransactionId: string,
    email: string,
    clientMutationId: string,
|}

export type CreateTransactionInput = {|
    productId: string,
    associatedEventId: string,
    associatedLocationId: string,
    receivingPersonId: string,
    productNotes: string,
    clientMutationId: string,
|}

export type CreateUserInput = {|
    username: string,
    password: string,
    clientMutationId: string,
|}

export type EventCatalogQueryQuery = {|
    eventTypes: {|
        edges: Array<{|
            // The item at the end of the edge
            node: {|
                // The ID of the object.
                id: string,
                displayName: string,
            |},
        |}>,
    |},
|}

export type EventListQueryQueryVariables = {|
    eventSearchValue: string,
    eventTypes: Array<string>,
|}

export type EventListQueryQuery = {|
    events: {|
        edges: Array<{|
            // The item at the end of the edge
            node: {|
                // The ID of the object.
                id: string,
                name: string,
                slug: string,
                dateStart: any,
                timeStart: any,
                isReoccuringYearly: boolean,
            |},
        |}>,
    |},
|}

export type CreateAssociatedLocationMutationMutationVariables = {|
    input: CreateAssociatedLocationInput,
|}

export type CreateAssociatedLocationMutationMutation = {|
    createAssociatedLocation: {|
        associatedLocation: {|
            // The ID of the object.
            id: string,
            location: {|
                // The ID of the object.
                id: string,
                displayName: string,
            |},
        |},
    |},
|}

export type AppQuery = {|
    currentUser: {|
        // The ID of the object.
        id: string,
        person: {|
            // The ID of the object.
            id: string,
            fullName: string,
        |},
    |},
|}

export type AssociatedEventDetailsQueryVariables = {|
    associatedEventId: string,
|}

export type AssociatedEventDetailsQuery = {|
    // The ID of the object
    associatedEvent: {|
        // The ID of the object.
        id: string,
        receivingPerson: {|
            // The ID of the object.
            id: string,
            fullName: string,
        |},
        transactions: {|
            edges: Array<{|
                // The item at the end of the edge
                node: {|
                    // The ID of the object.
                    id: string,
                    costUsd: number,
                    product: {|
                        // The ID of the object.
                        id: string,
                        name: string,
                        mainImageUrl: string,
                        description: string,
                    |},
                |},
            |}>,
        |},
        event: {|
            // The ID of the object.
            id: string,
            name: string,
            dateStart: any,
            timeStart: any,
            isReoccuringYearly: boolean,
            relatedProducts: {|
                edges: Array<{|
                    // The item at the end of the edge
                    node: {|
                        name: string,
                        description: string,
                        // The ID of the object.
                        id: string,
                        slug: string,
                    |},
                |}>,
            |},
        |},
    |},
|}

export type AssociatedEventsListQuery = {|
    currentUser: {|
        // The ID of the object.
        id: string,
        person: {|
            // The ID of the object.
            id: string,
            fullName: string,
            createdEvents: {|
                edges: Array<{|
                    // The item at the end of the edge
                    node: {|
                        // The ID of the object.
                        id: string,
                        receivingPerson: {|
                            // The ID of the object.
                            id: string,
                            fullName: string,
                        |},
                        transactions: {|
                            edges: Array<{|
                                // The item at the end of the edge
                                node: {|
                                    // The ID of the object.
                                    id: string,
                                |},
                            |}>,
                        |},
                        event: {|
                            // The ID of the object.
                            id: string,
                            name: string,
                            dateStart: any,
                            timeStart: any,
                            isReoccuringYearly: boolean,
                        |},
                    |},
                |}>,
            |},
        |},
    |},
|}

export type CreateAssociatedEventMutationVariables = {|
    input: CreateAssociatedEventInput,
|}

export type CreateAssociatedEventMutation = {|
    createAssociatedEvent: {|
        associatedEvent: {|
            // The ID of the object.
            id: string,
            creatingPerson: {|
                fullName: string,
            |},
            receivingPerson: {|
                fullName: string,
            |},
            event: {|
                name: string,
            |},
        |},
    |},
|}

export type CreatePersonMutationVariables = {|
    input: CreatePersonInput,
|}

export type CreatePersonMutation = {|
    createPerson: {|
        person: {|
            // The ID of the object.
            id: string,
            datetimeCreated: any,
            fullName: string,
            firstName: string,
            lastName: string,
            email: string,
            associatedLocations: {|
                edges: Array<{|
                    // The item at the end of the edge
                    node: {|
                        location: {|
                            // The ID of the object.
                            id: string,
                            displayName: string,
                        |},
                        // The ID of the object.
                        id: string,
                    |},
                |}>,
            |},
        |},
    |},
|}

export type CreatePersonPageQuery = {|
    currentUser: {|
        // The ID of the object.
        id: string,
        person: {|
            // The ID of the object.
            id: string,
            fullName: string,
        |},
    |},
|}

export type PersonDetailsQueryVariables = {|
    personId: string,
|}

export type PersonDetailsQuery = {|
    // The ID of the object
    person: {|
        // The ID of the object.
        id: string,
        fullName: string,
        datetimeCreated: any,
        email: string,
        birthDate: any,
        transactions: {|
            edges: Array<{|
                // The item at the end of the edge
                node: {|
                    // The ID of the object.
                    id: string,
                    datetimeCreated: any,
                    productNotes: string,
                    product: {|
                        // The ID of the object.
                        id: string,
                        name: string,
                        mainImageUrl: string,
                    |},
                |},
            |}>,
        |},
        receivedEvents: {|
            edges: Array<{|
                // The item at the end of the edge
                node: {|
                    // The ID of the object.
                    id: string,
                    event: {|
                        // The ID of the object.
                        id: string,
                        name: string,
                        dateStart: any,
                        timeStart: any,
                        isReoccuringYearly: boolean,
                    |},
                |},
            |}>,
        |},
    |},
|}

export type PersonListQuery = {|
    currentUser: {|
        // The ID of the object.
        id: string,
        person: {|
            // The ID of the object.
            id: string,
            fromRelationships: {|
                edges: Array<{|
                    // The item at the end of the edge
                    node: {|
                        // The ID of the object.
                        id: string,
                        relationshipType: RelationshipRelationshipType,
                        toPerson: {|
                            // The ID of the object.
                            id: string,
                            fullName: string,
                        |},
                    |},
                |}>,
            |},
        |},
    |},
|}

export type CreateStripeUserMutationVariables = {|
    input: CreateStripeUserInput,
|}

export type CreateStripeUserMutation = {|
    createStripeUser: {|
        user: {|
            hasStripeUser: boolean,
        |},
    |},
|}

export type CreateTransactionMutationVariables = {|
    input: CreateTransactionInput,
|}

export type CreateTransactionMutation = {|
    createTransaction: {|
        transaction: {|
            // The ID of the object.
            id: string,
            costUsd: number,
            product: {|
                // The ID of the object.
                id: string,
                name: string,
            |},
            associatedLocation: {|
                // The ID of the object.
                id: string,
                location: {|
                    // The ID of the object.
                    id: string,
                    displayName: string,
                |},
            |},
            stripeTransactionId: string,
            productNotes: string,
        |},
    |},
|}

export type PurchaseProductQueryVariables = {|
    associatedEventId: string,
    productId: string,
|}

export type PurchaseProductQuery = {|
    currentUser: {|
        email: string,
        hasStripeUser: boolean,
        // The ID of the object.
        id: string,
        person: {|
            // The ID of the object.
            id: string,
            fullName: string,
        |},
    |},
    // The ID of the object
    associatedEvent: {|
        // The ID of the object.
        id: string,
        receivingPerson: {|
            fullName: string,
            // The ID of the object.
            id: string,
            associatedLocations: {|
                edges: Array<{|
                    // The item at the end of the edge
                    node: {|
                        // The ID of the object.
                        id: string,
                        location: {|
                            // The ID of the object.
                            id: string,
                            displayName: string,
                        |},
                    |},
                |}>,
            |},
        |},
        event: {|
            name: string,
            // The ID of the object.
            id: string,
            dateStart: any,
            timeStart: any,
            isReoccuringYearly: boolean,
        |},
    |},
    // The ID of the object
    product: {|
        name: string,
        // The ID of the object.
        id: string,
        slug: string,
        costUsd: number,
        description: string,
    |},
|}

export type CreateUserMutationVariables = {|
    input: CreateUserInput,
|}

export type CreateUserMutation = {|
    createUser: {|
        user: {|
            email: string,
        |},
    |},
|}

export type TransactionDetailsQueryVariables = {|
    transactionId: string,
|}

export type TransactionDetailsQuery = {|
    // The ID of the object
    transaction: {|
        // The ID of the object.
        id: string,
        datetimeCreated: any,
        receivingPerson: {|
            // The ID of the object.
            id: string,
            fullName: string,
        |},
        costUsd: number,
        product: {|
            // The ID of the object.
            id: string,
            name: string,
            description: string,
            mainImageUrl: string,
        |},
        associatedEvent: {|
            // The ID of the object.
            id: string,
            event: {|
                // The ID of the object.
                id: string,
                name: string,
                dateStart: any,
                timeStart: any,
                isReoccuringYearly: boolean,
            |},
        |},
        associatedLocation: {|
            // The ID of the object.
            id: string,
            location: {|
                // The ID of the object.
                id: string,
                displayName: string,
            |},
        |},
        productNotes: string,
    |},
|}

export type SearchEventTypesQueryQueryVariables = {|
    search: string,
|}

export type SearchEventTypesQueryQuery = {|
    eventTypes: {|
        edges: Array<{|
            // The item at the end of the edge
            node: {|
                // The ID of the object.
                id: string,
                displayName: string,
            |},
        |}>,
    |},
|}

export type SearchPeopleQueryQueryVariables = {|
    value: string,
|}

export type SearchPeopleQueryQuery = {|
    people: {|
        edges: Array<{|
            // The item at the end of the edge
            node: {|
                // The ID of the object.
                id: string,
                fullName: string,
            |},
        |}>,
    |},
|}
