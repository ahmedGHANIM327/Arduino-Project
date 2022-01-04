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
import {NavLink, Outlet , useNavigate } from 'react-router-dom';

export default function Sidenav() {

    const [nav_opened , setNavOpened] = useState(false);
    const navigate = useNavigate();

    return (
            <div id="sidenav">
                <div className="navbar">
                <div className="header">
                    <MenuIcon className='header-button' onClick={() => setNavOpened(!nav_opened)}/>
                    <Avatar className='header-avatar'>A</Avatar>
                </div>
                <div className={!nav_opened?'sidenav' : 'sidenav active'} >
                    <ul>
                        <li><NavLink to="/notifyme/" onClick={() => setNavOpened(!nav_opened)} className={({isActive}) => { return isActive ? "activLink" : "not"}}><DashboardIcon /> Dashboard</NavLink></li>
                        <li><NavLink to="/notifyme/messages" onClick={() => setNavOpened(!nav_opened)} className={({isActive}) => { return isActive ? "activLink" : ""}}><SendIcon />Messages</NavLink></li>
                        <li><NavLink to="/notifyme/employees" onClick={() => setNavOpened(!nav_opened)} className={({isActive}) => { return isActive ? "activLink" : ""}}><PersonIcon />Employees</NavLink></li>
                        <li><NavLink to="/notifyme/groups" onClick={() => setNavOpened(!nav_opened)} className={({isActive}) => { return isActive ? "activLink" : ""}}><GroupIcon />Groups</NavLink></li>
                    </ul>
                    <Button onClick={() => navigate('/')} className='deconnexion finish' variant="contained" startIcon={<KeyboardArrowLeftIcon />} color="error">Deconnexion</Button>
                </div>
            </div>
            <div className='main-content'>
                <Outlet />
            </div>
            </div>
    )
}
