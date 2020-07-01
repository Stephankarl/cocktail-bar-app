import React, { Fragment, useState } from 'react';
import MixerForm from './MixerForm';

export default function SingleMixer(props) {
  const { mixer } = props;
  const [showForm, setShowForm] = useState(false);

  const toggelState = () => {
    setShowForm(!showForm);
  };

  return (
    <Fragment>
      <li style={listItem}>
        <div style={listName}>{mixer.type}</div>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'less' : 'more'}
        </button>
      </li>
      <div>{showForm ? <MixerForm mixer={mixer} toggler={toggelState} /> : null}</div>
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
