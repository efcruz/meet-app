# meet App

 This is a serverless, progressive web application (PWA) built with React using test-driven development (TDD). The application uses the Google Calendar API to fetch upcoming events.


## How to install and run the project ...

1. Clone or download repository ...
```bash
git clone https://github.com/efcruz/meet-app.git
```

2. Connect to your github pages 
Follow the instructions provided by github: https://pages.github.com 

3. Edit homepage address in package.json to fit to your github account

4. To run app on localhost:
```bash
npm run start
```

5. To push changes to github pages
```bash
npm run deploy
```

## Features and User stories

## FEATURE 1: FILTER EVENTS BY CITY
As a user, I would like to be able to filter events by city so that I can see the list of events that
take place in that city.

### SCENARIO 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.
Given user hasn’t searched for any city.
When the user opens the app.
Then the user should see a list of all upcoming events.

### SCENARIO 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.
Given the main page is open.
When user starts typing in the city textbox.
Then the user should see a list of cities (suggestions) that match what they’ve typed.

### SCENARIO 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.
Given the user was typing “Berlin” in the city textbox
And the list of suggested cities is showing.
When the user selects a city (e.g., “Berlin, Germany”) from the list.
Then their city should be changed to that city (i.e., “Berlin, Germany”)
And the user should receive a list of upcoming events in that city.

## FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS

As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.

### SCENARIO 1: AN EVENT ELEMENT IS COLLAPSED BY DEFAULT
Given the list of events.
When the user didn’t choose any event.
Then all the events will be collapsed.

### SCENARIO 2: User can expand an event to see its details
Given the list of events.
When the user clicks an event.
Then events will expand for more details.

### Scenario 3: User can collapse an event to hide its details
Given an expanded event.
When user clicks the event.
Then event should collapse.

## FEATURE 3: SPECIFY NUMBER OF EVENTS

As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

### Scenario 1: When user hasn’t specified a number, 32 is the default number
Given a list of events.
When the user doesn’t specify the number of events.
Then 32 events will be displayed.

### Scenario 2: User can change the number of events they want to see.
Given a list of events.
When the user specify the number os events.
Then the number specified of events should appear.

## FEATURE 4: USE THE APP WHEN OFFLINE

As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.

### Scenario 1: Show cached data when there’s no internet connection
Given no access to internet.
When a user wants to use the application.
Then the cached data should be showed.

### Scenario 2: Show error when user changes the settings (city, time range)
Given no access to internet.
When user change settings (city, time range).
Then an error message should be showed.

## FEATURE 5: DATA VISUALIsATION

As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organised in which city.

### Scenario 1: Show a chart with the number of upcoming events in each city
Given the main page.
When the user wants to see the upcoming events.
Then a chart with the number of events in each city should be showed.

