import {useState} from 'react';
import './Sidenav.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { BrowserRouter as Router , Route, Routes , NavLink } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard'
import Employees from '../Employees/Employees'
import Messages from '../Messages/Messages'
import Groups from '../Groups/Groups'

export default function Sidenav() {

    const [nav_opened , setNavOpened] = useState(false);

    return (
        <Router>
            <div className="navbar">
                <div className="header">
                    <MenuIcon className='header-button' onClick={() => setNavOpened(!nav_opened)}/>
                    <Avatar className='header-avatar'>A</Avatar>
                </div>
                <div className={!nav_opened?'sidenav' : 'sidenav active'} >
                    <ul>
                        <li><NavLink to="/" onClick={() => setNavOpened(!nav_opened)} className={({isActive}) => { return isActive ? "activLink" : ""}}><DashboardIcon /> Dashboard</NavLink></li>
                        <li><NavLink to="/messages" onClick={() => setNavOpened(!nav_opened)} className={({isActive}) => { return isActive ? "activLink" : ""}}><SendIcon />Messages</NavLink></li>
                        <li><NavLink to="/employees" onClick={() => setNavOpened(!nav_opened)} className={({isActive}) => { return isActive ? "activLink" : ""}}><PersonIcon />Employees</NavLink></li>
                        <li><NavLink to="/groups" onClick={() => setNavOpened(!nav_opened)} className={({isActive}) => { return isActive ? "activLink" : ""}}><GroupIcon />Groups</NavLink></li>
                    </ul>
                    <Button className='deconnexion' variant="contained" startIcon={<KeyboardArrowLeftIcon />} color="error">Deconnexion</Button>
                </div>
            </div>
            <div className='main-content'>
                <Routes>
                    <Route path="/" exact={true} element={<Dashboard />} />
                    <Route path="/employees" exact={true} element={<Employees />} />
                    <Route path="/messages" exact={true} element={<Messages />} />
                    <Route path="/groups" exact={true} element={<Groups />} />
                </Routes>
            </div>
        </Router>
    )
}
