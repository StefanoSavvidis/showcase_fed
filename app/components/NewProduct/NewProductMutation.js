import {gql} from 'apollo-boost';

const NEW_PRODUCT_MUTATION = gql`
  mutation CreateProduct($product: ProductInput!) {
    productCreate(input: $product) {
      product {
        id
        title
      }
    }
  }
`;

export default NEW_PRODUCT_MUTATION;
