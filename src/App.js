import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateNumberOfEvents = (numberOfEvents) => {
    const { currentLocation } = this.state;
    this.setState(
      {
        numberOfEvents
      },
      this.updateEvents(currentLocation, numberOfEvents)
    );
    
  };


  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
        if (this.mounted) {
          this.setState({
            events: locationEvents.slice(0, this.state.numberOfEvents),
            currentLocation: location,
          });
        }
        });
      }

  render() {
    const { events, locations, numberOfEvents } = this.state;

    return (
      <div className="App">
        <h1 className='page-title'>Meet App</h1>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
       
        <NumberOfEvents 
          numberOfEvents={numberOfEvents} 
              updateNumberOfEvents={this.updateNumberOfEvents}/>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;