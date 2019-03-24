import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../auth/ErrorField'

class NewPersonForm extends Component {

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <Field name='firstName' component={ErrorField} type='text' />
          <Field name='lastName' component={ErrorField} type='text' />
          <Field name='email' component={ErrorField} type='text' />
          <div>
            <input type='submit' />
          </div>
        </form>
      </div>
    );
  }
}

const validate = ({firstName, email}) => {
  const errors = {};
  if(!firstName) errors.firstName = 'first name is required';

  if(!email) errors.email = 'email is required';
  else if (!emailValidator.validate(email)) errors.email = 'invalid email';

  return errors;
}

export default reduxForm({
  form: 'person',
  validate
})(NewPersonForm)