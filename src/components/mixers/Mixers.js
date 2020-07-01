import React, { Component } from 'react';
import SingleMixer from './SingleMixer';
import AddMixer from './AddMixer';

export default class Mixers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mixers: [],
      showMixers: false,
      addMixer: false,
    };
  }

  componentDidMount() {
    const mixerURI = 'http://localhost:5000/api/mixers';
    fetch(mixerURI)
      .then(res => res.json())
      .then(data => {
        this.setState({
          mixers: data,
        });
      });
  }

  toggleShow = () =>
    this.setState({
      showMixers: !this.state.showMixers,
    });

  render() {
    const { mixers, showMixers, addMixer } = this.state;
    return (
      <div className='component-container'>
        {/* HEADING  */}
        <div style={headingContainer}>
          <button onClick={this.toggleShow} style={showLiquorBtn}>
            {!showMixers ? 'Show Mixers' : 'Hide Mixers'}
          </button>
          <h1 style={heading}>Mixers</h1>

          {/* ADD Mixers BUTTON WITH DISPLAYING THE FORM  */}
          <button
            onClick={() => this.setState({ addMixer: !addMixer })}
            style={addLiquorBtn}
          >
            {addMixer ? '-' : '+'}
          </button>
        </div>
        {/* RENDERING LIST OF LIQUOR IF SHOW LIQUOR IS CLICKED  */}
        {showMixers ? (
          <ul>
            <h2 style={liquorListHeading}>Mixer List</h2>
            {mixers.map(mixer => (
              <SingleMixer key={mixer.id} mixer={mixer} />
            ))}
          </ul>
        ) : null}

        {/* RENDERING THE FORM  */}
        {addMixer ? (
          <div>
            <AddMixer />
          </div>
        ) : null}
      </div>
    );
  }
}

const headingContainer = {
  display: 'flex',
};

const heading = {
  margin: '0 auto',
};

const showLiquorBtn = {
  marginLeft: '40px',
};

const addLiquorBtn = {
  width: '70px',
  marginRight: '30px',
};

const liquorListHeading = {
  marginBottom: '30px',
};
