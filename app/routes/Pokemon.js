import React from 'react';
import {NewProduct} from '../components';
import {Page, AppProvider} from '@shopify/polaris';

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.id);
  }

  render() {
    return (
      <AppProvider>
        <NewProduct id={this.props.match.params.id} />
      </AppProvider>
    );
  }
}

export default CreateProduct;
