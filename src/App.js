import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { OfflineAlert } from './Alert';
import { getEvents, extractLocations } from './api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    offlineAlert: ''
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
    if (!navigator.onLine) {
      this.setState({
        offlineAlert: 'You are not connected to the internet'
      });
    } else {
      this.setState({
        offlineAlert: ''
      });
    }
  }

  componentWillUnmount() {
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  render() {
    const { events, locations, numberOfEvents, offlineAlert } = this.state;

    return (
      <div className="App">
        <div className='offline-alert-container'>
          <OfflineAlert text={offlineAlert} />
        </div>
        <h1 className='page-title'>Meet App</h1>
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents
          numberOfEvents={numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents} />
        <div className='data-vis-wrapper'>
          <EventGenre events={events} />
          <ResponsiveContainer height={400} >
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={events} />
      </div>
    );
  }
}

export default App;