import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const App = (props) => {
    const {
        data: {
            loading,
            currentUser
        }
    } = props;
    if (loading) return <span>loading</span>;
    return (
        <div>
          <h2>Hello, {currentUser.email}</h2>
        </div>
    )
}
const HellWorld = gql`
  query CurrentUserForLayout {
    currentUser {
        email
    }
  }
`;

export default graphql(HellWorld)(App);
