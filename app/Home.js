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
  Thumbnail,
  Layout,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
  ResourceList,
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
      products(first: 10) {
        edges {
          node {
            id
            title
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;

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
            <Card>
              <Card.Section>
                <Query query={SHOP_NAME}>
                  {({loading, error, data}) => {
                    if (loading) return <Spinner size="small" color="teal" />;
                    if (error) return `Error! ${error.message}`;

                    console.log(data);
                    return <Heading>{data.shop.name}</Heading>;
                  }}
                </Query>
              </Card.Section>
              <break />
              <Card.Section title="Pokemon">
                <Query query={PRODUCT_DATA}>
                  {({loading, error, data}) => {
                    if (data) {
                      console.log(data);
                      let content = <p />;
                      if (data.shop) {
                        console.log(data.shop.products);
                        content = (
                          <ResourceList
                            resourceName={{
                              singular: 'pokemon',
                              plural: 'pokemon',
                            }}
                            items={data.shop.products.edges}
                            renderItem={(item) => {
                              let {id, title} = item.node;
                              title = title.replace(/^\w/, (c) =>
                                c.toUpperCase(),
                              );
                              const media = (
                                <Thumbnail
                                  source={item.node.images.edges[0].node.src}
                                  alt={title}
                                />
                              );
                              return (
                                <ResourceList.Item
                                  id={id}
                                  media={media}
                                  accessibilityLabel={`Delete ${title}`}
                                >
                                  <h3>
                                    <TextStyle variation="strong">
                                      {title}
                                    </TextStyle>
                                  </h3>
                                </ResourceList.Item>
                              );
                            }}
                          />
                        );
                      }

                      return content;
                    }
                  }}
                </Query>
              </Card.Section>
              <break />
              <Card.Section title="Collections">
                <Query query={COLLECTION_QUERY}>
                  {({loading, error, data}) => {
                    if (data) {
                      console.log(data);

                      let content = <p />;

                      if (data.shop) {
                        console.log(data.shop.collections.edges);

                        content = (
                          <ResourceList
                            resourceName={{
                              singular: 'type',
                              plural: 'types',
                            }}
                            items={data.shop.collections.edges}
                            renderItem={(item) => {
                              let {id, title} = item.node;
                              title = title.replace(/^\w/, (c) =>
                                c.toUpperCase(),
                              );
                              const media = <Avatar initials={title[0]} />;
                              return (
                                <ResourceList.Item
                                  id={id}
                                  media={media}
                                  accessibilityLabel={`Delete ${title}`}
                                >
                                  <h3>
                                    <TextStyle variation="strong">
                                      {title}
                                    </TextStyle>
                                  </h3>
                                </ResourceList.Item>
                              );
                            }}
                          />
                        );
                      }
                      return content;
                    }
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
