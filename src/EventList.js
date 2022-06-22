import React, { Component } from 'react';
import Event from './Event';



class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
        <div className='event-list-container'>
            {events.map(event =>
                <li  key={event.id} className="EventList">
                    <Event event={event} />
                </li>
            )}
        </div>
    );
  }
}

export default EventList;