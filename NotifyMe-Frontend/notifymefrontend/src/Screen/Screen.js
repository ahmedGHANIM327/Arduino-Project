import React from 'react'
import './Screen.css';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import api from '../Api/Notifyme';
import { useState , useEffect } from 'react';
import {useNavigate,useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function Screen(props) {

    const navigate = useNavigate();
    const location = useLocation();
    
    const id_badge = location.state.id_badge.replaceAll(" ","");
    const id_employee = location.state.id_employee;
    var employeeId;

    //Get Employee informations
    const retrieveEmployeeById = async () => {
        const response = await api.get("employeeBadge/"+id_badge);
        return response.data;
    }

    const [employee, setEmployee] = useState({});
    employeeId = employee.id;
    //Retreive all messages
    const retrieveMessagesNotSeen = async () => {
        const response = await api.get("/viewMessagesNotSeen/"+id_employee);
        return response.data;
    }

    const [messages, setMessages] = useState([]);

     useEffect(async () => {

        const getEmployee = async () => {
            const employee1 = await retrieveEmployeeById();
            if (employee1){
                setEmployee(employee1);
                employeeId = employee.id;
            } 
        }
        const getAllMessages = async () => {
            const allmessagesnotseen = await retrieveMessagesNotSeen();
            if (allmessagesnotseen) setMessages(allmessagesnotseen);
        }
        getEmployee();
        getAllMessages();
        
    }, [])

    

    return (
        <div id="screen">
            <h1>Welcome <span className="employeeName">{employee.name}</span></h1>
            <h2><ForwardToInboxIcon />  You have {messages.length} new messages !</h2>
            {messages.map((message) => (
               <div className="messages">
                    <p className='content'>{message.message_content}</p>
                    <p className='date'>{message.date_sent.substr(0, 19)}</p>
                </div>                 
            ))}

            <Button onClick={() => navigate('/')} className='deconnexion' variant="contained" startIcon={<KeyboardArrowLeftIcon />} color="error">Finish reading</Button>
        </div>
        
    )
}
