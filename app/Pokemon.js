import React from 'react';
import {ApolloProvider, Mutation, Query} from 'react-apollo';
import ApolloClient, {gql} from 'apollo-boost';
import {
  AppProvider,
  Page,
  Card,
  Button,
  FormLayout,
  TextStyle,
  Heading,
  ChoiceList,
  SkeletonPage,
  Layout,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
  Thumbnail,
  Avatar,
} from '@shopify/polaris';
import Fetch from 'react-fetch-component';
import axios from 'axios';
import {concatSeries} from 'async';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match.params);
    this.state = {
      loading: true,
      pokemon: null,
      id: props.match.params.id,
      gender: ['male'],
      shiny: ['normal'],
    };
  }

  componentDidMount() {
    let self = this;

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.id}`)
      .then(function(response) {
        console.log(response);
        console.log(self);
        self.setState({
          loading: false,
          pokemon: response.data,
          current_image: response.data.sprites.front_default,
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get('https://api.pokemontcg.io/v1/cards?name=charizard&subtype=ex')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange = (value) => {
    let image = this.state.pokemon.sprites.front_default;
    let gender;
    let shiny;
    if (value == 'male') {
      gender = value;
      shiny = this.state.shiny;
    }
    if (value == 'female') {
      gender = value;
      shiny = this.state.shiny;
    }
    if (value == 'shiny') {
      gender = this.state.gender;
      shiny = value;
    }
    if (value == 'normal') {
      gender = this.state.gender;
      shiny = value;
    }

    if (gender == 'male' && shiny == 'normal') {
      if (this.state.pokemon.sprites.front_default)
        image = this.state.pokemon.sprites.front_default;
    }
    if (gender == 'male' && shiny == 'shiny') {
      image = this.state.pokemon.sprites.front_shiny;
      if (this.state.pokemon.sprites.front_shiny)
        image = this.state.pokemon.sprites.front_shiny;
    }

    if (gender == 'female' && shiny == 'normal') {
      if (this.state.pokemon.sprites.front_female)
        image = this.state.pokemon.sprites.front_female;
    }
    if (gender == 'female' && shiny == 'shiny') {
      image = this.state.pokemon.sprites.front_shiny;
      if (this.state.pokemon.sprites.front_shiny_female)
        image = this.state.pokemon.sprites.front_shiny_female;
    }

    this.setState({gender: gender, shiny: shiny, current_image: image});
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
        <Card
          title={this.state.pokemon.species.name.replace(/^\w/, (c) =>
            c.toUpperCase(),
          )}
          primaryFooterAction={{content: 'Add to Store'}}
        >
          <Card.Section>
            <Avatar size="large" source={this.state.current_image} />
          </Card.Section>
          <Card.Section>
            <ChoiceList
              title={'Gender'}
              choices={[
                {label: 'Male', value: 'male'},
                {label: 'Female', value: 'female'},
              ]}
              selected={this.state.gender}
              onChange={this.handleChange}
            />
          </Card.Section>
          <Card.Section>
            <ChoiceList
              title={'Shiny'}
              choices={[
                {label: 'Normal', value: 'normal'},
                {label: 'Shiny', value: 'shiny'},
              ]}
              selected={this.state.shiny}
              onChange={this.handleChange}
            />
          </Card.Section>
        </Card>
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

export default Pokemon;
