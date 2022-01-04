import React from 'react'
import './Messages.css'
import api from '../Api/Notifyme'
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function Messages() {
    let selectedEmployeesGroups;
    let textFieldValue;

    const FilterMessagesSeen = (message) => {
        if (messageShow === 'all') {
            return true;
        } else if (messageShow === 'not seen') {
            return message.stat_message === 'R';
        } else if (messageShow === 'seen') {
            return message.stat_message === 'V';
        }
    }

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


        const getAllGroups = async () => {
            const allgroups = await retrieveGroups();
            if (allgroups) setAllGroups(allgroups);
        }

        getAllEmployees();
        getAllMessages();
        getAllGroups();
    }, [])

    const [messageShow, setMessageShow] = React.useState('all');

    const handleChange = (event) => {
        setMessageShow(event.target.value);
    };

    // Event handler to retrieve the message to be sent
    const handleTextFieldChange = (e) => {
        textFieldValue = e.target.value

    };

    // Event handler for the send button
    const handleClickSend = () => {

        //Extract ids
        let selectedIds = [];
        selectedEmployeesGroups.forEach(e => {
            if ("id_badge" in e) {
                selectedIds.push(e.id)
            } else {
                selectedIds = selectedIds.concat(e.employees)
            }
        })
        // POST request
        const addNewMessage = async () => {
            const datasent = [{
                message_content: textFieldValue,
                message_destinations: selectedIds,
            }];
            await api.post("/addmessages/", datasent);
        }
        addNewMessage();
    };

    // Pop-up send messsage
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);

    // Handler for delete message button
    const handleDeleteClick = () => {
        let id = msgid;
        console.log("request to delete, ", id)
        const deleteMessage = async () => {
            await api.delete("/deletemessage/" + id + "/", id);
        }
        deleteMessage();
    }
    //handle open pop-up for sending msg
    const handleClickOpen = () => {
        setOpen(true);
    };

    //handle close pop-up for sending msg
    const handleClose = () => {
        setOpen(false);
    };
    let msgid;
    const handleClickcell = (e) => {
        msgid = e;
        console.log("cell with id ", e)
    }
    // delete message button
    var deleteIcon = (<IconButton onClickCapture={handleDeleteClick}>
        <DeleteIcon color='error' />
    </IconButton>
    );

    return (
        <div>
            <Box textAlign='center'>
                <Button class='btn newmsg' variant="outlined" onClick={handleClickOpen}>
                    Send a new message
                </Button>
            </Box>


            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={fullWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >Send a new message</DialogTitle>
                <DialogContent>
                    <Grid container direction={"column"} spacing={5}>
                        <Grid item>
                            <TextField id="time" type="text" label="write your message ..." fullWidth={true} onChange={handleTextFieldChange} />
                        </Grid>
                        <Grid item>
                            <Autocomplete
                                multiple
                                id="fixed-tags-demo"
                                options={allGroups.concat(allEmployees)}
                                getOptionLabel={(option) => option.name}
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) => (
                                        <Chip
                                            label={option.name}
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="To These people or groups" />
                                )}
                                onChange={(event, value) => selectedEmployeesGroups = value}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickSend}>Send</Button>

                </DialogActions>
            </Dialog>


            <Grid container direction="row"
                justifyContent="space-around"
                alignItems="flex-start">

                <Grid className='stat-table' lg={12}>
                    <div className='head-table'>
                        <h1 >Old Messages</h1>
                        <FormControl className='filter-messages' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Show</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={messageShow}
                                onChange={handleChange}
                                label="Show"
                            >
                                <MenuItem value={'all'}>All</MenuItem>
                                <MenuItem value={'not seen'}>Not Seen Yet</MenuItem>
                                <MenuItem value={'seen'}>Seen</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Delete</TableCell>
                                    <TableCell>Date Sent</TableCell>
                                    <TableCell align="left">Content</TableCell>
                                    <TableCell align="left">Vues Number</TableCell>
                                    <TableCell align="left">State</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allMessages.filter(FilterMessagesSeen).map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" align="left" scope="row" onClickCapture={() => handleClickcell(row.id)} >
                                            {deleteIcon}
                                        </TableCell>
                                        <TableCell component="td" scope="row">
                                            {row.date_sent}
                                        </TableCell>
                                        <TableCell align="left">{row.message_content}</TableCell>
                                        <TableCell align="left">{row.seen_by.length}</TableCell>
                                        <TableCell align="left">{row.stat_message === 'R' ? <HourglassBottomIcon /> : <DoneAllIcon />}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    )
}
