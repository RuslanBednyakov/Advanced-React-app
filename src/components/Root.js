import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import AdminPage from './routes/AdminPage'
import AuthPage from './routes/AuthPage'
import ProtectedRoute from './common/ProtectedRoute'
import PersonPage from './routes/PersonPage'

class Root extends Component {
  render() {
    return (
      <div>
        <ProtectedRoute path='/admin' component={AdminPage}/>
        <Route path='/auth' component={AuthPage}/>
        <Route path='/person' component={PersonPage}/>
      </div>
    );
  }
}

export default Root;