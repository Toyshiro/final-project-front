import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header';
import WorkPlace from './Components/WorkPlace';

const root = ReactDOM.createRoot(document.getElementById('root'));
const componentList = ["", "", "", ""];
root.render(
  <div className='root'>
    <Header />
    <WorkPlace />
  </div>

);

reportWebVitals();
