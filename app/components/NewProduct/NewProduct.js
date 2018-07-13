import React from 'react';
import {ApolloProvider, Mutation, Query} from 'react-apollo';
import ApolloClient, {gql} from 'apollo-boost';
import {
  AppProvider,
  Page,
  Card,
  Button,
  Badge,
  TextStyle,
  Heading,
  RadioButton,
  SkeletonPage,
  Layout,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
  Stack,
  Avatar,
  CalloutCard,
} from '@shopify/polaris';
import Fetch from 'react-fetch-component';
import axios from 'axios';
import {concatSeries} from 'async';
import {runInThisContext} from 'vm';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

class NewProduct extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      loading: true,
      pokemon: null,
      id: props.id,
      name: props.name,
      value: 'basic',
      basicCard: null,
      card: null,
      exCard: null,
      exAvailable: true,
    };
  }

  componentDidMount() {
    let self = this;

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.id}`)
      .then(function(response) {
        self.setState({
          loading: false,
          pokemon: response.data,
          current_image: response.data.sprites.front_default,
        });

        if (self.state.pokemon.name != 'mew') {
          axios
            .get(
              `https://api.pokemontcg.io/v1/cards?name=${
                self.state.pokemon.name
              }&subtype=ex`,
            )
            .then(function(response) {
              if (response.data.cards.length > 0) {
                self.setState({
                  exCard: response.data.cards[0],
                  exAvailable: false,
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });

          axios
            .get(
              `https://api.pokemontcg.io/v1/cards?name=${
                self.state.pokemon.name
              }&setCode=base1`,
            )
            .then(function(response) {
              if (response.data.cards.length > 0) {
                self.setState({
                  basicCard: response.data.cards[0],
                });
                self.updateCard('basic');
              } else {
                axios
                  .get(
                    `https://api.pokemontcg.io/v1/cards?name=${
                      self.state.pokemon.name
                    }&setCode=base2`,
                  )
                  .then(function(response) {
                    if (response.data.cards.length > 0) {
                      self.setState({
                        basicCard: response.data.cards[0],
                      });
                      self.updateCard('basic');
                    } else {
                      axios
                        .get(
                          `https://api.pokemontcg.io/v1/cards?name=${
                            self.state.pokemon.name
                          }&setCode=base3`,
                        )
                        .then(function(response) {
                          if (response.data.cards.length > 0) {
                            self.setState({
                              basicCard: response.data.cards[0],
                            });
                            self.updateCard('basic');
                          } else {
                            axios
                              .get(
                                `https://api.pokemontcg.io/v1/cards?name=${
                                  self.state.pokemon.name
                                }&setCode=base4`,
                              )
                              .then(function(response) {
                                if (response.data.cards.length > 0) {
                                  self.setState({
                                    basicCard: response.data.cards[0],
                                  });
                                  self.updateCard('basic');
                                } else {
                                }
                              })
                              .catch(function(error) {
                                console.log(error);
                              });
                          }
                        })
                        .catch(function(error) {
                          console.log(error);
                        });
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          self.setState({
            basicCard: 'mew',
          });
        }
      })

      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange = (checked, newValue) => {
    this.setState({value: newValue});
    this.updateCard(newValue);
  };

  updateCard = (type) => {
    if (type == 'basic') {
      this.setState({
        card: this.state.basicCard,
      });
    } else {
      this.setState({
        card: this.state.exCard,
      });
    }
  };

  render() {
    const loadingState = this.state.loading ? (
      <SkeletonPage secondaryActions={2}>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
                <SkeletonBodyText />
                <SkeletonBodyText />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    ) : null;

    const cardLoaded =
      this.state.card && this.state.card != 'mew' ? (
        <CalloutCard
          title={''}
          illustration={this.state.card.imageUrlHiRes}
          primaryAction={{
            content: 'Add to Store',
          }}
        />
      ) : null;

    const mewLoaded =
      this.state.card && this.state.card == 'mew' ? (
        <CalloutCard
          title={this.state.pokemon.species.name.replace(/^\w/, (c) =>
            c.toUpperCase(),
          )}
          primaryAction={{
            content: 'NO',
          }}
        >
          <p>MEW IS TOO POWERFUL TO BE ADDED TO THE STORE</p>
        </CalloutCard>
      ) : null;
    const content = !this.state.loading ? (
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
        <Layout>
          <Layout.Section>
            <Card
              title={this.state.pokemon.species.name.replace(/^\w/, (c) =>
                c.toUpperCase(),
              )}
            >
              <Card.Section>
                <Stack spacing="extraLoose">
                  <Avatar size="large" source={this.state.current_image} />
                  <Stack vertical={true}>
                    <Badge status="warning">Fire</Badge>
                    <Badge>Flying</Badge>
                  </Stack>
                  <Stack vertical>
                    <RadioButton
                      label="Basic"
                      id="basic"
                      checked={this.state.value === 'basic'}
                      onChange={this.handleChange}
                    />
                    <RadioButton
                      label="EX"
                      id="extra"
                      checked={this.state.value === 'extra'}
                      onChange={this.handleChange}
                      disabled={this.state.exAvailable}
                    />
                  </Stack>
                </Stack>
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            {cardLoaded}
            {mewLoaded}
          </Layout.Section>
        </Layout>
      </Page>
    ) : null;

    return (
      <ApolloProvider client={client}>
        <AppProvider>
          <React.Fragment>
            {loadingState}
            {content}
          </React.Fragment>
        </AppProvider>
      </ApolloProvider>
    );
  }
}

export default NewProduct;
