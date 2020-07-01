import React, { Component } from 'react';
import Dispenser from './Dispenser';

export default class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dispensers: [],
    };
  }

  componentDidMount = () => {
    const barURI = 'http://localhost:5000/api/bar';
    fetch(barURI)
      .then(res => res.json())
      .then(data => {
        this.setState({
          dispensers: data,
        });
      });
  };

  render() {
    const { dispensers } = this.state;
    return (
      <div style={barComponent} className='component-container'>
        <h1 style={heading}>Bar</h1>
        <div style={dispenserContainer}>
          {dispensers.map((dispenser, index) => (
            <Dispenser key={dispenser.id} dispenser={dispenser} index={index} />
          ))}
          <div>
            <svg width='500' height='30'>
              <rect width='500' height='100' style={tray} />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

const barComponent = {};

const heading = {
  textAlign: 'center',
};

const dispenserContainer = {
  textAlign: 'center',
  marginBottom: '30px',
};

const tray = {
  fill: 'gray',
};
