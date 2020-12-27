import { gql } from 'apollo-server-express';

const typeDefs = gql`

  type authdata {
    access_token: String!
  }

  type Query {
    ping: String!,
    signup(email: String!, password: String!): authdata!,
    login(email: String!, password: String!): authdata!
  }
`;

export default typeDefs;