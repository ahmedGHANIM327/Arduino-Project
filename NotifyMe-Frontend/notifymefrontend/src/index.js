import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router , Route, Routes , NavLink } from 'react-router-dom';
import App from './App';
import Home from './HOME/Home';
import Dashboard from './Dashboard/Dashboard'
import Employees from './Employees/Employees'
import Messages from './Messages/Messages'
import Groups from './Groups/Groups'

ReactDOM.render(
  <React.StrictMode>
        <App />
  </React.StrictMode>,
  document.getElementById('root')
);


