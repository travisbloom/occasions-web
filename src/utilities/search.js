import gql from 'graphql-tag'

const wrapInOptionsObject = options => ({ options })

export const searchPeople = (client, additionalOptions = {}) => value => client
    .query({
        query: gql`
        query SearchPeople($value: String) {
          people(infoContains: $value) {
              edges {
                  node {
                      id
                      pk
                      fullName
                  }
              }
          }
        }
        `,
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
        query: gql`
        query SearchEventTypes($search: String) {
          eventTypes(search: $search) {
            edges {
              node {
                id
                pk
                displayName
              }
            }
          }
        }
        `,
        variables: { search },
        ...additionalOptions,
    })
    .then(({ data: { eventTypes } }) => eventTypes.edges.map(({ node }) => ({
        label: node.displayName,
        value: node.pk,
        node,
    })))
    .then(wrapInOptionsObject)
