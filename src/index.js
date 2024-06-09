import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Board from './Components/Board';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='root'>
    <Header />
    <div className="workPlace">
      <Sidebar />
      <Board />
    </div>
  </div>

);

reportWebVitals();
