import './App.css';
import Sidenav from './Sidenav/Sidenav';
import { BrowserRouter as Router , Route, Routes , NavLink } from 'react-router-dom';
import Home from './HOME/Home';
import Dashboard from './Dashboard/Dashboard'
import Employees from './Employees/Employees'
import Messages from './Messages/Messages'
import Groups from './Groups/Groups'

function App() {
  return (
    <div className="App">
      <Router>
            <div >
                <Routes>
                    <Route path="/" exact={true} element={<Home />} />
                    <Route path="/notifyme/" exact={true} element={<Sidenav />} >
                      <Route path="/notifyme/" exact={true} element={<Dashboard />} />
                      <Route path="/notifyme/employees" exact={true} element={<Employees />} />
                      <Route path="/notifyme/messages" exact={true} element={<Messages />} />
                      <Route path="/notifyme/groups" exact={true} element={<Groups />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    </div>
  );
}

export default App;
