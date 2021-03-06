import React, { Component } from 'react'
import {connect} from 'react-redux'
import {peopleListSelector, fetchAllPeople} from '../../ducks/people'
import {Table, Column} from 'react-virtualized'

export class PeopleTable extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchAllPeople && this.props.fetchAllPeople()
    }

    render() {
        return (
                    <Table
                        width={600}
                        height={300}
                        rowHeight={40}
                        headerHeight={50}
                        rowGetter={this.rowGetter}
                        rowCount={this.props.people.length}
                        overscanRowCount={2}
                        rowClassName="test--people-list__row"
                    >
                        <Column
                            label="First Name"
                            dataKey="firstName"
                            width={200}
                        />
                        <Column
                            label="Last Name"
                            dataKey="lastName"
                            width={200}
                        />
                        <Column
                            label="Email"
                            dataKey="email"
                            width={200}
                        />
                    </Table>
        )
    }

    rowGetter = ({ index }) => this.props.people[index]
}

export default connect(state => ({
    people: peopleListSelector(state)
}), {fetchAllPeople})(PeopleTable)