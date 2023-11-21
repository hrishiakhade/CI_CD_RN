// src/queries.js
import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      continent{
        name
      }
      languages {
        code
        name
      }
      native
      capital
      emoji
      currency
      phone
    }
  }
`;

export const GET_COUNTRIES_USES_USD = gql`
    query {
        countries(filter: { currency: { eq: "USD" } }) {
            code
            name
          }
    }
    `;


export const LIST_COUNTRIES_STARTING_WITH_A = gql`
    query {
        countries(filter: { name: { regex: "^A" } }) {
            code
            name
          }
    }
    `;


export const GET_COUNTRY_DETAILS = gql`
         query Country($countryCode: String!) {
            country(code: $countryCode) {
              name
              native
              capital
              emoji
              currency
              continent{
                name
              }              
              languages {
                code
                name
              }
            }
          } `;




export const GET_ANIMES_COVERS = gql`
    query {
      Page {
                 media {
                     bannerImage
                  }
          }
    }
    `;