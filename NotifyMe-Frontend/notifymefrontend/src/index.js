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
        <Router>
            <div >
                <Routes>
                    <Route path="/" exact={true} element={<Home />} />
                    <Route path="/notifyme/" exact={true} element={<App />} >
                      <Route path="/notifyme/" exact={true} element={<Dashboard />} />
                      <Route path="/notifyme/employees" exact={true} element={<Employees />} />
                      <Route path="/notifyme/messages" exact={true} element={<Messages />} />
                      <Route path="/notifyme/groups" exact={true} element={<Groups />} />
                    </Route>
                </Routes>
            </div>
        </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


