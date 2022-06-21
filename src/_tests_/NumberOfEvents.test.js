import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateNumberOfEvents={() => { }}/>);
    });

    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
    });

    // test('render 32 by default', () => {
    //     expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);

    //});

    test('render text input correctly', () => {
        const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
        expect(NumberOfEventsWrapper.find('.numberOfEvents-input').prop('value')).toBe(numberOfEvents);

    })
    
    // test('selecting a number should change the numberOfEvents state', () => {
    //     NumberOfEventsWrapper.setState({ numberOfEvents: 32  });
    //     NumberOfEventsWrapper.find('.numberOfEvents-input').simulate("change", {target: { value: 10 }});
    //     expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);
    //})

})