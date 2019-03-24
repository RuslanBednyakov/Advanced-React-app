import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from './ErrorField'

class SignUpForm extends Component {
  
  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <Field name='email' component={ErrorField} type='text' />
          <Field name='password' component={ErrorField} type='password' />
          <div>
            <input type='submit' />
          </div>
        </form>
      </div>
    );
  }
}

const validate = ({email, password}) => {
  const errors = {};
  
  if(!email) errors.email = 'email is required';
  else if (!emailValidator.validate(email)) errors.email = 'invalid email';

  if(!password) errors.password = 'password is required';
  else if(password.length < 4) errors.password = 'too short';

  return errors;
}

export default reduxForm({
  form: 'auth',
  validate
})(SignUpForm)