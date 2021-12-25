import React from 'react'
import api from '../Api/Notifyme'
import './Dashboard.css'
import { useState , useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function Dashboard() {

    //Retreive all employees
    const retrieveEmployees = async () => {
        const response = await api.get("/employees/");
        return response.data;
    }

    const [allEmployees, setAllEmployees] = useState([])

    //Retreive all messages
    const retrieveMessages = async () => {
        const response = await api.get("/messages/");
        return response.data;
    }

    const [allMessages, setAllMessages] = useState([]);

    //Retreive all messages Seen
    const retrieveMessagesSeen = async () => {
        const response = await api.get("/messagesSeen/");
        return response.data;
    }

    const [allMessagesSeen, setAllMessagesSeen] = useState([]);

    //Retreive all groups
    const retrieveGroups = async () => {
        const response = await api.get("/groups/");
        return response.data;
    }

    const [allGroups, setAllGroups] = useState([]);

    useEffect(() => {
        const getAllEmployees = async () => {
            const allemployees = await retrieveEmployees();
            if (allemployees) setAllEmployees(allemployees);
        }

        const getAllMessages = async () => {
            const allmessages = await retrieveMessages();
            if (allmessages) setAllMessages(allmessages);
        }

        const getAllMessagesSeen = async () => {
            const allmessagesseen = await retrieveMessagesSeen();
            if (allmessagesseen) setAllMessagesSeen(allmessagesseen);
        }


        const getAllGroups = async () => {
            const allgroups = await retrieveGroups();
            if (allgroups) setAllGroups(allgroups);
        }

        getAllEmployees();
        getAllMessages();
        getAllGroups();
        getAllMessagesSeen();
    }, [])

    return (

        <div id="dashboard">
            <Grid className='general-stats' container direction="row"
                justifyContent="space-around"
                alignItems="center">
                <Grid   xs={12} lg={3} md={6}>
                    <div className='general_stats_item'>
                        <h1>{allMessages.length} <ForwardToInboxIcon /></h1>
                        <p>Messages Sent</p>
                    </div>
                </Grid>
                <Grid  xs={12} lg={3} md={6}>
                    <div className='general_stats_item'>
                        <h1>{allMessagesSeen.length} <RemoveRedEyeIcon /></h1>
                        <p>Messages Seen</p>
                    </div>
                </Grid>
                <Grid xs={12} lg={3} md={6}>
                    <div className='general_stats_item'>
                        <h1>{allEmployees.length} <PersonIcon /></h1>
                        <p>Employees</p>
                    </div>
                </Grid>
                <Grid xs={12} lg={3} md={6}>
                    <div className='general_stats_item'>
                        <h1>{allGroups.length} <GroupIcon /></h1>
                        <p>Groups</p>
                    </div>
                </Grid>
            </Grid>

            <Grid container direction="row"
                justifyContent="space-around"
                alignItems="flex-start">
                
                <Grid  className='stat-table' lg={12}>
                    <h1>Messages</h1>
                    <TableContainer  component={Paper}>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>date_sent</TableCell>
                                <TableCell align="left">Conent</TableCell>
                                <TableCell align="left">Number Seen</TableCell>
                                <TableCell align="left">Stat</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {allMessages.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="td" scope="row">
                                    {row.date_sent}
                                </TableCell>
                                <TableCell align="left">{row.message_content}</TableCell>
                                <TableCell align="left">{row.seen_by.length}</TableCell>
                                <TableCell align="left">{row.stat_message === 'R' ? <HourglassBottomIcon/> : <DoneAllIcon /> }</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid className='stat-table' xs={12} lg={8} md={8}>
                    <h1>Employees</h1>
                    <TableContainer component={Paper} >
                        <Table  aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>id_badge</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {allEmployees.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell scope="row">
                                    {row.id_badge}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid className='stat-table' xs={12} lg={4} md={4}>
                    <h1>Groups</h1>
                    <TableContainer component={Paper} >
                        <Table  aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Number of employees</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {allGroups.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.employees.length}</TableCell>

                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            
        </div>
    );
}
