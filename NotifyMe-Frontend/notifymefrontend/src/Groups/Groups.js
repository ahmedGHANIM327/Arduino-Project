import React from 'react'
import api from '../Api/Notifyme'
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
export default function Groups() {

    let newGroupName, newGroupMembers;
    const [editedGroupName, seteditedGroupName] = useState("");
    const [editedGroupMembers, seteditedGroupMembers] = useState([]);
    const [groupId, setgroupId] = useState("");

    //Retreive all employees
    const retrieveEmployees = async () => {
        const response = await api.get("/employees/");
        return response.data;
    }

    const [allEmployees, setAllEmployees] = useState([])

    //Retreive all groups
    const retrieveGroups = async () => {
        const response = await api.get("/groups/");
        return response.data;
    }

    const [allGroups, setAllGroups] = useState([]);
    // Pop-up add group
    const [open, setOpen] = React.useState(false);

    // Pop-up edit group
    const [openEdit, setOpenEdit] = React.useState(false);

    // Pop-up employee card view
    const [openEmployeeCard, setopenEmployeeCard] = React.useState(false);
    const [employeeCard, setEmployeeCard] = React.useState(false);

    const [fullWidth,] = React.useState(true);

    useEffect(() => {
        const getAllEmployees = async () => {
            const allemployees = await retrieveEmployees();
            if (allemployees) setAllEmployees(allemployees);
        }

        const getAllGroups = async () => {
            const allgroups = await retrieveGroups();
            if (allgroups) setAllGroups(allgroups);
        }

        getAllEmployees();
        getAllGroups();
    }, [])

    // Event handler to retrieve the name of the new employee
    const handleNameChange = (e) => {
        newGroupName = e.target.value

    };

    //handle open pop-up for creating new employee
    const handleClickOpen = () => {
        setOpen(true);
    };

    //handle close pop-up for adding new employee
    const handleClose = () => {
        setOpen(false);
    };

    //handle open pop-up for editing an employee
    const handleClickOpenEdit = () => {

        setOpenEdit(true);
    };
    //handle open pop-up to view an employee card
    const handleEmployeeChipClick = (e) => {
        setEmployeeCard(e);
        setopenEmployeeCard(true);
    };

    //handle close pop-up to view an employee card
    const handleEmployeeChipClose = () => {
        setopenEmployeeCard(false);
    };
    //handle close pop-up for editing an employee
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    // Event handler for the send button
    const handleClickCreate = () => {

        if (!newGroupName) {
            alert("Group name field is empty !");
            return
        }
        if (!newGroupMembers) {
            alert("Group memebers field is empty !");
            return
        }
        //Extract ids
        let selectedIds = [];
        newGroupMembers.forEach(e => {
            if ("id_badge" in e) {
                selectedIds.push(e.id)
            }
        })
        // POST request
        const addNewGroup = async () => {
            const data = [{
                name: newGroupName,
                employees: selectedIds,
            }];
            await api.post("/addgroups/", data);
        }
        addNewGroup();
        setOpen(false);
        window.location.reload();
    };

    // delete employee event handlers
    let deletedGroupId;
    const handleClickcell = (e) => {

        seteditedGroupName(e.name);
        let temp = [];
        e.employees.forEach(id =>
            temp.push(allEmployees.find(element => element["id"] === id))
        )
        seteditedGroupMembers(temp);
        setgroupId(e.id);
        deletedGroupId = e.id;

    };

    // Handler for delete message button
    const handleDeleteClick = () => {
        const deleteEmployee = async () => {
            await api.delete("/deletegroup/" + deletedGroupId + "/", deletedGroupId);
        }
        deleteEmployee();
        window.location.reload();
    }

    // Handler for edit employee button
    const handleClickEdit = () => {

        if (!editedGroupName) {
            alert("Group name field is empty !");
            return
        }
        if (!editedGroupMembers) {
            alert("Group members field is emplty !");
            return
        }
        //Extract ids
        let selectedIds = [];
        editedGroupMembers.forEach(e => {
            if ("id_badge" in e) {
                selectedIds.push(e.id)
            }
        })
        let data = {
            name: editedGroupName,
            employees: selectedIds,

        };
        const editGroup = async () => {
            await api.put("/updategroup/" + groupId + "/", data);
        }
        editGroup();
        window.location.reload();
        setOpenEdit(false);
    }

    // Event handler to retrieve the name of the edited employee
    const handleEditedNameChange = (e) => {
        seteditedGroupName(e.target.value);

    };

    // Event handler to retrieve the members of the edited group
    const handleEditedGroupMembersChange = (e, v) => {
        seteditedGroupMembers(v);

    };

    // delete message button
    var deleteIcon = (<IconButton onClickCapture={handleDeleteClick}>
        <DeleteIcon color='error' />
    </IconButton>
    );

    // Edit employee button
    var editIcon = (<IconButton onClickCapture={handleClickOpenEdit}>
        <EditIcon color='primary' />
    </IconButton>
    );


    return (
        <div>

            <Box textAlign='center'>
                <Button class='btn newmsg' variant="outlined" onClick={handleClickOpen}>
                    Create a new group
                </Button>
            </Box>


            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={fullWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >Add a new Group</DialogTitle>
                <DialogContent>
                    <Grid container direction={"column"} spacing={5}>
                        <Grid item>
                            <TextField required id="time" type="text" label="Groupe name" fullWidth={true} onChange={handleNameChange} />
                        </Grid>


                        <Grid item>
                            <Autocomplete
                                multiple
                                id="fixed-tags-demo"
                                options={allEmployees}
                                getOptionLabel={(option) => option.name}
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) => (
                                        <Chip
                                            label={option.name}
                                            onClick={() => handleEmployeeChipClick(option)}
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="Group members" />
                                )}
                                onChange={(event, value) => newGroupMembers = value}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickCreate}>Create</Button>

                </DialogActions>
            </Dialog >

            <Dialog open={openEmployeeCard}
                onClose={handleEmployeeChipClose}>
                <DialogContent>
                    <Typography variant="body2">
                        Badge Id : {employeeCard.id_badge}
                    </Typography >
                    <Typography variant="body2">
                        Name: {employeeCard.name}
                    </Typography >
                    <Typography variant="body2">
                        Email : {employeeCard.email}
                    </Typography >
                </DialogContent>
            </Dialog>
            <Dialog
                open={openEdit}
                onClose={handleCloseEdit}
                fullWidth={fullWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >Edit a Group</DialogTitle>
                <DialogContent>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item>
                            <TextField id="time" type="text" label="Group name" fullWidth={true} defaultValue={editedGroupName} onChange={handleEditedNameChange} />
                        </Grid>
                        <Grid item>
                            <Autocomplete
                                multiple
                                id="fixed-tags-demo"
                                options={allEmployees}
                                defaultValue={editedGroupMembers}
                                getOptionLabel={(option) => option.name}
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) => (
                                        <Chip
                                            label={option.name}
                                            onClick={() => handleEmployeeChipClick(option)}
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="Group members" />
                                )}
                                onChange={handleEditedGroupMembersChange}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleClickEdit}>Edit</Button>

                </DialogActions>
            </Dialog>

            <Grid className='stat-table' lg={12} container>
                <h1>Groups</h1>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Number of employees</TableCell>
                                <TableCell></TableCell>
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
                                    <TableCell component="th" align="left" scope="row" onClickCapture={() => handleClickcell(row)} >
                                        {editIcon}
                                        {deleteIcon}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </div>
    )
}

