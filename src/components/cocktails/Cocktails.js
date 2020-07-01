import React, { Component } from 'react';
import SingleCocktail from './SingleCocktail';
import AddCocktail from './AddCocktail';

export default class Cocktails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cocktails: [],
      addCocktail: false,
      liquor: [],
      mixers: [],
      glasses: [],
      garnish: [],
    };
  }

  componentDidMount = () => {
    const cocktailURI = 'http://localhost:5000/api/cocktails';
    const liquorURI = 'http://localhost:5000/api/liquor';
    const mixerURI = 'http://localhost:5000/api/mixers';
    const glassURI = 'http://localhost:5000/api/glasses';
    const garnishURI = 'http://localhost:5000/api/garnish';

    fetch(cocktailURI)
      .then(res => res.json())
      .then(data =>
        this.setState({
          cocktails: data,
        })
      );

    fetch(liquorURI)
      .then(res => res.json())
      .then(data =>
        this.setState({
          liquor: data,
        })
      );

    fetch(mixerURI)
      .then(res => res.json())
      .then(data =>
        this.setState({
          mixers: data,
        })
      );

    fetch(glassURI)
      .then(res => res.json())
      .then(data =>
        this.setState({
          glasses: data,
        })
      );

    fetch(garnishURI)
      .then(res => res.json())
      .then(data =>
        this.setState({
          garnish: data,
        })
      );
  };

  render() {
    const { cocktails, addCocktail, liquor, mixers, glasses, garnish } = this.state;
    return (
      <div className='component-container'>
        <div className='heading-container'>
          <h1 style={heading}>Cocktails</h1>
        </div>
        <div className='cocktail-collection'>
          {cocktails.map(cocktail => (
            <SingleCocktail
              key={cocktail.id}
              cocktail={cocktail}
              liquor={liquor}
              mixerData={mixers}
              glassData={glasses}
              garnishData={garnish}
            />
          ))}
        </div>
        <div style={btnDiv}>
          <button
            onClick={() => this.setState({ addCocktail: !addCocktail })}
            style={addCocktailBtn}
          >
            {addCocktail ? '-' : '+'}
          </button>
        </div>
        {addCocktail ? (
          <AddCocktail
            liquorData={liquor}
            mixersData={mixers}
            glassData={glasses}
            garnishData={garnish}
          />
        ) : null}
      </div>
    );
  }
}

const heading = {
  textAlign: 'center',
};

const btnDiv = {
  textAlign: 'right',
};

const addCocktailBtn = {
  width: '70px',
  padding: '10px',
  marginRight: '30px',
};
