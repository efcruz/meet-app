import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    //test if the component EventList exists
    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    //test if the component CitySearch exists
    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    //test if the component CitySearch exists
    test('render number of events', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    })

});

describe('<App /> integration', () => {

    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    })

    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });


    test('get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionsItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionsItems.at(suggestionsItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    })

    test('load 32 events by default', () => {
        const AppWrapper = mount(<App />);
        expect(AppWrapper.state('numberOfEvents')).toBe(32);
        AppWrapper.unmount();
    })


    test('pass number of events from the NumberOfEvents component to the App component', () => {
        const AppWrapper = mount(<App />);
        //Component "NumberOfEvents"
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents)
        //Get input value
        NumberOfEventsWrapper.find('.numberOfEvents-input').at(0).simulate('change', { target: { value: 12 } })
        expect(AppWrapper.state("numberOfEvents")).toBe(12);
        AppWrapper.unmount();

    })


});