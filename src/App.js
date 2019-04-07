import React, { Component } from 'react';
import {Provider} from 'react-redux'
import store from './redux'
import Root from './components/Root'
import { ConnectedRouter } from 'connected-react-router'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import history from './history'
import './config'
import './mocks'

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <DragDropContextProvider backend={HTML5Backend}>
          <ConnectedRouter history={history}>
            <Root/>
          </ConnectedRouter>
        </DragDropContextProvider>
      </Provider>
    );
  }
}

export default App;