import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Board from './Components/Board';
import ProjectList from './Components/ProjectList';
import UserInfo from './Components/UserInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='root'>
    <Header />
    <div className="workPlace">
      <Sidebar />
      <UserInfo />
      {/* <Board /> */}
      {/* <ProjectList /> */}
    </div>
  </div>

);

reportWebVitals();
