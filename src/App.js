import React from 'react';
import './App.css';
import Liquor from './components/liquor/Liquor';
import Cocktails from './components/cocktails/Cocktails';
import Mixers from './components/mixers/Mixers';
import Bar from './components/bar/Bar';

function App() {
  return (
    <div className='App'>
      <Cocktails />
      <Bar />
      <Liquor />
      <Mixers />
    </div>
  );
}

export default App;
