import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import AdminPage from './routes/AdminPage'
import AuthPage from './routes/AuthPage'
import ProtectedRoute from './common/ProtectedRoute'
import PersonPage from './routes/PersonPage'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {moduleName, signOut} from '../ducks/auth'
import EventsPage from './routes/EventsPage'
import CustomDragLayer from './CustomDragLayer'

class Root extends Component {
  render() {
    const {signOut, signedIn} = this.props;
    const btn = signedIn
      ? <button onClick={signOut}>Sign Out</button>
      : <Link to='/auth/signin'>Sign In</Link>
    return (
      <div>
        {btn}
        <ul>
          <li><Link to='/admin'>admin</Link></li>
          <li><Link to='/people'>people</Link></li>
          <li><Link to='/events'>events</Link></li>
        </ul>
        <CustomDragLayer />
        <ProtectedRoute path='/admin' component={AdminPage}/>
        <ProtectedRoute path='/people' component={PersonPage}/>
        <ProtectedRoute path='/events' component={EventsPage}/>
        <Route path='/auth' component={AuthPage}/>
      </div>
    );
  }
}

export default connect(state => ({
  signedIn: !!state[moduleName].user
}), {signOut})(Root);