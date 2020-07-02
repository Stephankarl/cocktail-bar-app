import React, { Fragment, useState } from 'react';
import LiquorForm from './LiquorForm';

export default function SingleLiquor(props) {
  const { liquor } = props;
  const [showForm, setShowForm] = useState(false);

  const toggelState = () => {
    setShowForm(!showForm);
  };

  return (
    <Fragment>
      <li style={listItem}>
        <div style={listName}>
          {liquor.type} - {liquor.name}
        </div>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'less' : 'more'}
        </button>
      </li>
      <div>{showForm ? <LiquorForm liquor={liquor} toggler={toggelState} /> : null}</div>
    </Fragment>
  );
}

const listItem = {
  display: 'flex',
  listStyle: 'none',
  padding: '5px',
};

const listName = {
  marginRight: '10px',
};
