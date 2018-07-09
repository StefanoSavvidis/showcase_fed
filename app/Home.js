import React from 'react';
import {ApolloProvider, Mutation, Query} from 'react-apollo';
import ApolloClient, {gql} from 'apollo-boost';
import {
  AppProvider,
  Page,
  Card,
  Button,
  Spinner,
  TextStyle,
  Heading,
  Avatar,
  SkeletonPage,
  Layout,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
} from '@shopify/polaris';
import Fetch from 'react-fetch-component';

const ALL_PRODUCTS = gql`
  {
    shop {
      products(first: 10) {
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

const SHOP_NAME = gql`
  {
    shop {
      name
    }
  }
`;

const PRODUCT_DATA = gql`
  {
    shop {
      products(first: 1) {
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

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <AppProvider>
          <Page
            title="Pokify"
            secondaryActions={[
              {
                content: 'Pokedex',
                url: '/',
              },
              {
                content: 'My Pokemon',
                url: '/mine',
              },
            ]}
          >
            <Card title="My Pokemon">
              <Card.Section>
                <Query query={SHOP_NAME}>
                  {({loading, error, data}) => {
                    if (loading) return <Spinner size="small" color="teal" />;
                    if (error) return `Error! ${error.message}`;

                    console.log(data);
                    return <Heading>{data.shop.name}</Heading>;
                  }}
                </Query>
                <break />
                <Query query={PRODUCT_DATA}>
                  {({loading, error, data}) => {
                    if (loading) return <Spinner size="small" color="teal" />;
                    if (error) return `Error! ${error.message}`;

                    console.log(data);
                    return <p>{data.shop.products.edges[0].node.title}</p>;
                  }}
                </Query>
              </Card.Section>
            </Card>
          </Page>
        </AppProvider>
      </ApolloProvider>
    );
  }
}
export default Home;
