import React, { Component } from 'react';

export default class EditDispenser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liquor: [],
    };
  }

  componentDidMount() {
    const liquorURI = 'http://localhost:5000/api/liquor';
    fetch(liquorURI)
      .then(res => res.json())
      .then(data => {
        this.setState({
          liquor: data,
        });
      });
  }

  changeHandle = e => {
    console.log(e.target.value);
  };

  render() {
    const { liquor } = this.state;
    const { dispenser, index } = this.props;
    return (
      <div>
        <h4>Changing Liquor in Dispenser {dispenser.id}</h4>
        <select onChange={this.changeHandle}>
          <option>None</option>
          {liquor.map((oneLiquor, i) => (
            <option key={i}>
              {oneLiquor.name} {oneLiquor.category}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
