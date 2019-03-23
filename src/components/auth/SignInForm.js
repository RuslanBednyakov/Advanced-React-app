import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

class SignInForm extends Component {
  render() {
    return (
      <div>
        <h2>Sign In</h2>
        <form>
          <div>
            <label>Email</label>
            <Field name='email' component='input' type='text' />
          </div>
          <div>
            <label>Password</label>
            <Field name='password' component='input' type='password' />
          </div>
          <div>
            <input type='submit' />
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'auth'
})(SignInForm)