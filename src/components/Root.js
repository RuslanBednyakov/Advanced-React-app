import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import AdminPage from './routes/AdminPage'
import AuthPage from './routes/AuthPage'
import ProtectedRoute from './common/ProtectedRoute'
import PersonPage from './routes/PersonPage'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {moduleName, signOut} from '../ducks/auth'

class Root extends Component {
  render() {
    const {signOut, signedIn} = this.props;
    const btn = signedIn
      ? <button onClick={signOut}>Sign Out</button>
      : <Link to='/auth/signin'>Sign In</Link>
    return (
      <div>
        {btn}
        <ProtectedRoute path='/admin' component={AdminPage}/>
        <Route path='/auth' component={AuthPage}/>
        <Route path='/people' component={PersonPage}/>
      </div>
    );
  }
}

export default connect(state => ({
  signedIn: !!state[moduleName].user
}), {signOut})(Root);