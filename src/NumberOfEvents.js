import React, { Component } from "react";


class NumberOfEvents extends Component {
    constructor() {
        super();
     
        this.state = {
            errorText: ''
        }
      }
    
      handleInput = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 32) {
          this.setState({
            errorText: 'Please enter a number between 1 and 32',
          })
        }
        if (value > 0 && value < 33 ) {
          this.setState({
            errorText: ''
          })
        }
        this.props.updateNumberOfEvents(value);       
      };

    render () {
        const { numberOfEvents} = this.props
        
        return (
        <div className="numberOfEvents">
          
            <input type= "number" className="numberOfEvents-input" value={numberOfEvents} onChange={this.handleInput}>
            </input>
           
                
        </div>
        )
    }

}
export default NumberOfEvents;