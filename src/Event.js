import React, { Component } from "react";

class Event extends Component {
    constructor() {
        super();
     
        this.state = {
            collapsed: true
        }
      }

      handleClick = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    
    return (
        <div className="event bg-transparent">
          <div>
            <h1 className="event-name">{event.summary}</h1>
            <div>
              <p className="event-dateTime">{event.start.dateTime} ({event.start.timeZone})</p>
              <p className="event-location">{event.location}</p>
            </div>
            <div 
                className={`details-button ${collapsed ? "show" : "hide"}-details`}
                onClick={this.handleClick}>
            {collapsed ? "Show Details" : "Hide Details"}
            </div>

            {!collapsed &&
              <div className={`extra-details ${this.state.collapsed ? "hide" : "show"}`}>
              <p className="event-description">{event.description}</p>
              </div>
					  }
          </div>
        </div>
    )
  }
}
export default Event;