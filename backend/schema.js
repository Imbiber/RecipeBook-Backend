const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    profile_pic: String
    registration_date: String!
    # Other user-related fields as needed
  }

  type Recipe {
    id: ID!
    user_id: ID!
    title: String!
    description: String!
    recipe: String!
    thumbnail: String
    creation_date: String!
  }

  type Comment {
    id: ID!
    user_id: ID!
    recipe_id: ID!
    comment_text: String!
    comment_date: String!
  }

  # Query and Mutation types could be defined as well

  type Query {
    getAllUsers: [User!]!
    getUserById(user_id: ID!): User!
    getRecipeById(recipe_id: ID!): Recipe!
    getAllRecipes: [Recipe!]!
    getAllRecipeComments(recipe_id: ID!): [Comment!]!
    getRecipeByUserId(user_id: ID!): [Recipe!]!
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      profile_pic: String
      registration_date: String
    ): User!
    addRecipe(
      user_id: ID!
      title: String!
      description: String!
      recipe: String!
      thumbnail: String
      creation_date: String
    ): Recipe!
    addComment(
      user_id: ID!
      recipe_id: ID!
      comment_text: String!
      comment_date: String
    ): Comment!
    getUserByLogin(name: String!, email: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
