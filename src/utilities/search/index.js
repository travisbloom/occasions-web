import searchPeopleGraphqlQuery from './SearchPeopleQuery.graphql'
import SearchEventTypesQuery from './SearchEventTypesQuery.graphql'

const wrapInOptionsObject = options => ({ options })

export const searchPeople = (client, additionalOptions = {}) => value => client
    .query({
        query: searchPeopleGraphqlQuery,
        variables: { value },
        ...additionalOptions,
    })
    .then(({ data: { people } }) => people.edges.map(({ node }) => ({
        label: node.fullName,
        value: node.pk,
        node,
    })))
    .then(wrapInOptionsObject)

export const searchEventTypes = (client, additionalOptions = {}) => search => client
    .query({
        query: SearchEventTypesQuery,
        variables: { search },
        ...additionalOptions,
    })
    .then(({ data: { eventTypes } }) => eventTypes.edges.map(({ node }) => ({
        label: node.displayName,
        value: node.pk,
        node,
    })))
    .then(wrapInOptionsObject)
