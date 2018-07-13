import {gql} from 'apollo-boost';

const COLLECTION_QUERY = gql`
  {
    shop {
      collections(first: 10) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`;

export default COLLECTION_QUERY;
