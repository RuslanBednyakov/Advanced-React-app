import React, { Component } from 'react';
import {Provider} from 'react-redux'
import store from './redux'
import Root from './components/Root'
import { ConnectedRouter } from 'connected-react-router'
import history from './history'
import './config'

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <ConnectedRouter history={history}>
          <Root/>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;