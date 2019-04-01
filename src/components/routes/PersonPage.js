import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPerson, moduleName} from '../../ducks/people'
import NewPersonForm from '../people/NewPersonForm'
import PeopleTable from '../people/PeopleTable'
import Loader from '../common/Loader'

class PersonPage extends Component {
  render() {
    const {loading, addPerson} = this.props

    return (
      <div>
        <h2>Add new person</h2>
        <PeopleTable />
        {loading
          ? <Loader />
          : <NewPersonForm onSubmit={addPerson} />
        }
      </div>
    );
  }
}

export default connect(state => ({
  loading: state[moduleName].loading
}), {addPerson})(PersonPage);