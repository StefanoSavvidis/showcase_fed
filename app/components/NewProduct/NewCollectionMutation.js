import {gql} from 'apollo-boost';

const NEW_COLLECTION_MUTATION = gql`
  mutation CreateCollection($collection: CollectionInput!) {
    collectionCreate(input: $collection) {
      collection {
        id
        title
      }
    }
  }
`;

export default NEW_COLLECTION_MUTATION;
