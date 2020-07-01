import React, { Fragment } from 'react';
import EditDispenser from './EditDispenser';

export default function Dispenser(props) {
  const [dispenserInfo, setDispenserInfo] = React.useState(false);
  const [liquorInDispenser, setLiquorInDispenser] = React.useState(false);
  const { dispenser, index } = props;

  const mouseOver = () => {
    setDispenserInfo(true);
  };

  const mouseLeave = () => {
    setDispenserInfo(false);
  };

  const dispenserHandle = () => {
    setLiquorInDispenser(!liquorInDispenser);
  };

  return (
    <Fragment>
      <div
        style={dispenserStyle}
        onMouseEnter={mouseOver}
        onMouseLeave={mouseLeave}
        onClick={dispenserHandle}
      >
        <svg width='80' height='200'>
          <polygon
            points='10,10 10,150 30,150 30,170 50,170 50,150 70,150 70,10'
            style={bottle}
          />
          <text x='40' y='90' fill='black' textAnchor='middle'>
            {dispenser.id}
          </text>
        </svg>
        <div
          style={{ ...dispenserInfoContainer, display: dispenserInfo ? 'block' : 'none' }}
        >
          <h5 style={{ marginLeft: '15px' }}>Dispenser Number: {dispenser.id}</h5>
          <h5 style={{ marginLeft: '15px' }}>
            Liquor: {dispenser.liquor ? dispenser.liquor : 'None'}
          </h5>
        </div>
      </div>
      <div style={{ display: liquorInDispenser ? 'block' : 'none' }}>
        <EditDispenser dispenser={dispenser} index={index} />
      </div>
    </Fragment>
  );
}

const dispenserStyle = {
  display: 'inline-block',
  textAlign: 'center',
  position: 'relative',
};

const bottle = {
  stroke: 'black',
  strokeWidth: '1',
  fill: 'white',
};

const dispenserInfoContainer = {
  position: 'absolute',
  top: '20px',
  left: '80px',
  width: '180px',
  textAlign: 'left',
  backgroundColor: 'rgb(233, 233, 233)',
  border: '1px solid black',
  borderRadius: '5px',
  zIndex: '1',
};

const liquorSelect = {
  width: '100px',
};
