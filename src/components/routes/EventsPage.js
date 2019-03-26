import React, { Component } from 'react';
import EventList from '../events/EventList'

class EventsPage extends Component {
  render() {
    return (
      <div>
        <h1>Events Page!</h1>
        <EventList/>
      </div>
    );
  }
}

export default EventsPage;