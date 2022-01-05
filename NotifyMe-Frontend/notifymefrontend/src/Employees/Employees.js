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
export default function Employees() {

    let newEmployeeName, newEmployeeBadgeID, newEmployeeEmail;
    const [editedEmployeeName, setEditedEmployeeName] = useState("");
    const [editedEmployeeBadgeID, setEditedEmployeeBadgeID] = useState("");
    const [editedEmployeeEmail, setEditedEmployeeEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    
    //Retreive all employees
    const retrieveEmployees = async () => {
        const response = await api.get("/employees/");
        return response.data;
    }

    const [allEmployees, setAllEmployees] = useState([])
    
    // Pop-up add employee
    const [open, setOpen] = React.useState(false);

    // Pop-up edit employee
    const [openEdit, setOpenEdit] = React.useState(false);
    const [fullWidth,] = React.useState(true);

    useEffect(() => {
        const getAllEmployees = async () => {
            const allemployees = await retrieveEmployees();
            if (allemployees) setAllEmployees(allemployees);
        }

        getAllEmployees();
    }, [])

    // Event handler to retrieve the name of the new employee
    const handleNameChange = (e) => {
        newEmployeeName = e.target.value

    };

    const handleEmailChange = (e) => {
        newEmployeeEmail = e.target.value

    };

    // Event handler to retrieve the badge id of the new employee
    const handleBadgeIDChange = (e) => {
        newEmployeeBadgeID = e.target.value

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

    //handle close pop-up for editing an employee
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    // Event handler to retrieve the name of the edited employee
    const handleEditedNameChange = (e) => {
        setEditedEmployeeName(e.target.value);

    };

    const handleEditedEmailChange = (e) => {
        setEditedEmployeeEmail(e.target.value);

    };

    // Event handler to retrieve the badge id of the edited employee
    const handleEditedBadgeIDChange = (e) => {
        setEditedEmployeeBadgeID(e.target.value);

    };
    // Event handler for the send button
    const handleClickAdd = () => {

        if (!newEmployeeBadgeID) {
            alert("Badge ID field is emplty !");
            return
        }
        if (!newEmployeeName) {
            alert("Employee name field is empty !");
            return
        }
        if (!newEmployeeEmail) {
            alert("Employee Email field is empty !");
            return
        }

        // POST request
        const addNewEmployee = async () => {
            const datasent = [{
                id_badge: newEmployeeBadgeID,
                name: newEmployeeName,
                email: newEmployeeEmail,
            }];
            await api.post("/addemployees/", datasent);
        }
        addNewEmployee();
        setOpen(false);
        window.location.reload();
    };

    // delete employee event handlers
    let deletedEmployeeId;
    const handleClickcell = (e) => {

        setEditedEmployeeName(e.name);
        setEditedEmployeeBadgeID(e.id_badge);
        setEditedEmployeeEmail(e.email);
        setEmployeeId(e.id);
        deletedEmployeeId = e.id;

    };

    // Handler for delete message button
    const handleDeleteClick = () => {
        const deleteEmployee = async () => {
            await api.delete("/deleteemployee/" + deletedEmployeeId + "/", deletedEmployeeId);
        }
        deleteEmployee();
        window.location.reload();
    }

    // Handler for edit employee button
    const handleClickEdit = () => {

        if (!editedEmployeeName) {
            alert("Employee name field is empty !");
            return
        }
        if (!editedEmployeeBadgeID) {
            alert("Badge ID field is emplty !");
            return
        }

        if (!editedEmployeeEmail) {
            alert("Employee Email field is empty !");
            return
        }
        let data = [{
            id_badge: editedEmployeeBadgeID,
            name: editedEmployeeName,
            email: editedEmployeeEmail,
        }];
        const editEmployee = async () => {
            await api.put("/updateemployee/" + employeeId + "/", data);
        }
        editEmployee();
        window.location.reload();
        setOpenEdit(false);
    }

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
                    Add a new employee
                </Button>
            </Box>


            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={fullWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >Add a new Employee</DialogTitle>
                <DialogContent>
                    <Grid container direction={"column"} spacing={5}>
                        <Grid item>
                            <TextField required id="time" type="text" label="Employee name" fullWidth={true} onChange={handleNameChange} />
                        </Grid>
                        <Grid item>
                            <TextField required id="time" type="text" label="Badge ID" fullWidth={true} onChange={handleBadgeIDChange} />
                        </Grid>
                        <Grid item>
                            <TextField required id="time" type="text" label="Email adress" fullWidth={true} onChange={handleEmailChange} />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickAdd}>Add</Button>

                </DialogActions>
            </Dialog>

            <Dialog
                open={openEdit}
                onClose={handleCloseEdit}
                fullWidth={fullWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >Edit an Employee</DialogTitle>
                <DialogContent>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item>
                            <TextField id="time" type="text" label="Employee name" fullWidth={true} defaultValue={editedEmployeeName} onChange={handleEditedNameChange} />
                        </Grid>
                        <Grid item>
                            <TextField id="time" type="text" label="Badge ID" fullWidth={true} defaultValue={editedEmployeeBadgeID} onChange={handleEditedBadgeIDChange} />
                        </Grid>
                        <Grid item>
                            <TextField id="time" type="text" label="Email adress" fullWidth={true} defaultValue={editedEmployeeEmail} onChange={handleEditedEmailChange} />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleClickEdit}>Edit</Button>

                </DialogActions>
            </Dialog>

            <Grid className='stat-table' >
                <h1>Employees</h1>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>id_badge</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left"></TableCell>
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
