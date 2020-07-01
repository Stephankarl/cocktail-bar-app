import React, { Component } from 'react';
import SingleLiquor from './SingleLiquor';
import AddLiquor from './AddLiquor';

export default class Liquor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liquor: [],
      showLiquor: false,
      addLiquor: false,
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

  toggleShowLiquor = () =>
    this.setState({
      showLiquor: !this.state.showLiquor,
    });

  render() {
    const { liquor, showLiquor, addLiquor } = this.state;
    return (
      <div className='component-container'>
        {/* HEADING  */}
        <div style={headingContainer}>
          <button onClick={this.toggleShowLiquor} style={showLiquorBtn}>
            {!showLiquor ? 'Show Liquor' : 'Hide Liquor'}
          </button>
          <h1 style={heading}>Liquor</h1>

          {/* ADD LIQUOR BUTTON WITH DISPLAYING THE FORM  */}
          <button
            onClick={() => this.setState({ addLiquor: !addLiquor })}
            style={addLiquorBtn}
          >
            {addLiquor ? '-' : '+'}
          </button>
        </div>
        {/* RENDERING LIST OF LIQUOR IF SHOW LIQUOR IS CLICKED  */}
        {showLiquor ? (
          <ul>
            <h2 style={liquorListHeading}>Liquor List</h2>
            {liquor.map(oneLiquor => (
              <SingleLiquor key={oneLiquor.id} liquor={oneLiquor} />
            ))}
          </ul>
        ) : null}

        {/* RENDERING THE FORM  */}
        {addLiquor ? (
          <div>
            <AddLiquor />
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
