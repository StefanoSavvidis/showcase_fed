import React from 'react';
import {ApolloProvider, Mutation, Query} from 'react-apollo';
import ApolloClient, {gql} from 'apollo-boost';
import {
  AppProvider,
  Page,
  Card,
  Button,
  ResourceList,
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
import {ENXIO} from 'constants';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

class Pokedex extends React.Component {
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
            <Card title="Pokedex">
              <Card.Section>
                <Fetch
                  url="https://pokeapi.co/api/v2/pokemon/?limit=151"
                  as="json"
                >
                  {(fetchResults) => {
                    if (fetchResults.loading) {
                      return (
                        <Layout>
                          <Layout.Section>
                            <Card>
                              <Card.Section>
                                <TextContainer>
                                  <SkeletonDisplayText size="small" />
                                </TextContainer>
                              </Card.Section>
                              <Card.Section>
                                <TextContainer>
                                  <SkeletonDisplayText size="small" />
                                </TextContainer>
                              </Card.Section>
                              <Card.Section>
                                <TextContainer>
                                  <SkeletonDisplayText size="small" />
                                </TextContainer>
                              </Card.Section>
                              <Card.Section>
                                <TextContainer>
                                  <SkeletonDisplayText size="small" />
                                </TextContainer>
                              </Card.Section>
                              <Card.Section>
                                <TextContainer>
                                  <SkeletonDisplayText size="small" />
                                </TextContainer>
                              </Card.Section>
                              <Card.Section>
                                <TextContainer>
                                  <SkeletonDisplayText size="small" />
                                </TextContainer>
                              </Card.Section>
                              <Card.Section>
                                <TextContainer>
                                  <SkeletonDisplayText size="small" />
                                </TextContainer>
                              </Card.Section>
                              <Card.Section>
                                <TextContainer>
                                  <SkeletonDisplayText size="small" />
                                </TextContainer>
                              </Card.Section>
                              <Card.Section>
                                <TextContainer>
                                  <SkeletonDisplayText size="small" />
                                </TextContainer>
                              </Card.Section>
                              <Card.Section>
                                <TextContainer>
                                  <SkeletonDisplayText size="small" />
                                </TextContainer>
                              </Card.Section>
                              <Card.Section>
                                <TextContainer>
                                  <SkeletonDisplayText size="small" />
                                </TextContainer>
                              </Card.Section>
                              <Card.Section>
                                <TextContainer>
                                  <SkeletonDisplayText size="small" />
                                </TextContainer>
                              </Card.Section>
                            </Card>
                          </Layout.Section>
                        </Layout>
                      );
                    }

                    if (fetchResults.error) {
                      return <p>failed to fetch pokemon</p>;
                    }

                    if (fetchResults.data) {
                      return (
                        <Card>
                          <ResourceList
                            resourceName={{
                              singular: 'pokemon',
                              plural: 'pokemon',
                            }}
                            items={fetchResults.data.results}
                            renderItem={(item) => {
                              let {url, name} = item;
                              name = name.replace(/^\w/, (c) =>
                                c.toUpperCase(),
                              );
                              const id = `${url}`.match(/\d+/g)[1];
                              const media = (
                                <Avatar
                                  customer={false}
                                  size="medium"
                                  initials={name[0]}
                                />
                              );
                              const shortcutActions = `/${id}`
                                ? [
                                    {
                                      content: `View ${name}`,
                                      url: `/${id}`,
                                    },
                                  ]
                                : null;

                              return (
                                <ResourceList.Item
                                  id={id}
                                  media={media}
                                  accessibilityLabel={`View details for ${name}`}
                                  shortcutActions={shortcutActions}
                                >
                                  <h3>
                                    <TextStyle variation="strong">
                                      {name}
                                    </TextStyle>
                                  </h3>
                                  <div>ID: {id}</div>
                                </ResourceList.Item>
                              );
                            }}
                          />
                        </Card>
                      );
                    }
                  }}
                </Fetch>
              </Card.Section>
            </Card>
          </Page>
        </AppProvider>
      </ApolloProvider>
    );
  }
}

export default Pokedex;
