import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as containers from '../../containers';
import { Layout } from '../../hoc';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={containers.Home} />
          <Route path='*' exact component={containers.Home} />
        </Switch>
      </Layout>
    );
  }
}

export default App;