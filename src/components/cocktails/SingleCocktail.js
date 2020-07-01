import React, { Fragment, useState } from 'react';
import CocktailForm from './CocktailForm';

export default function SingleCocktail(props) {
  const [showForm, setShowForm] = useState(false);
  const { cocktail, liquor, mixerData, garnishData, glassData } = props;

  const toggleHandle = () => {
    setShowForm(!showForm);
  };

  return (
    <Fragment>
      <div
        className='single-cocktail'
        style={{ display: showForm ? 'none' : 'inline-block' }}
      >
        <div className='cocktail-name'>{cocktail.name}</div>
        <div className='cocktail-buttons'>
          <button>Make</button>
          <button onClick={() => setShowForm(!showForm)}>more</button>
        </div>
      </div>
      {showForm ? (
        <CocktailForm
          toggle={toggleHandle}
          cocktail={cocktail}
          liquorData={liquor}
          mixerData={mixerData}
          garnishData={garnishData}
          glassData={glassData}
        />
      ) : null}
    </Fragment>
  );
}
