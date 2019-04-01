import React, { Component } from 'react'
import {DropTarget} from 'react-dnd'
import {connect} from 'react-redux'
import {addEventToPerson, peopleListSelector} from '../../ducks/people'

class SelectedEventCard extends Component {
  render() {
    const {connectDropTarget, canDrop, hovered, people} = this.props;
    const {title, when, where} = this.props.event
    const dropStyle = {
      border: `1px solid ${canDrop? 'red' : 'black'}`,
      backgroundColor: hovered? 'green' : 'white'
    }
    const peopleElement = people && (
      <p>
        {people.map(person => person.email).join(', ')}
      </p>
  )
    return connectDropTarget(
      <div style={dropStyle}>
        <h3>{title}</h3>
        <p>{when}, {where}</p>
        {peopleElement}
      </div>
    );
  }
}

const spec = {
  drop(props, monitor) {
    const personUid = monitor.getItem().uid;
    const eventUid = props.event.uid;

    props.addEventToPerson(eventUid, personUid)

    return {eventUid}
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default connect((state, props) => ({
  people: peopleListSelector(state).filter(person => person.events.includes(props.event.uid))
}), {addEventToPerson})(DropTarget(['person'], spec, collect)(SelectedEventCard));