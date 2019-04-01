import React, { Component } from 'react'
import {DropTarget} from 'react-dnd'

class SelectedEventCard extends Component {
  render() {
    const {connectDropTarget, canDrop, hovered} = this.props;
    const dropStyle = {
      border: `1px solid ${canDrop? 'red' : 'black'}`,
      backgroundColor: hovered? 'green' : 'white'
    }
    const {title, when, where} = this.props.event
    return connectDropTarget(
      <div style={dropStyle}>
        <h3>{title}</h3>
        <p>{when}, {where}</p>
      </div>
    );
  }
}

const spec = {
  drop(props, monitor) {
    const personUid = monitor.getItem().uid;
    const eventuid = props.event.uid;
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default DropTarget(['person'], spec, collect)(SelectedEventCard);