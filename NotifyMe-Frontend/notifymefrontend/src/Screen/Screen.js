import React from 'react'
import './Screen.css';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import api from '../Api/Notifyme';
import { useState , useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function Screen() {

    const navigate = useNavigate();

    //Retreive all messages
    const retrieveMessagesNotSeen = async () => {
        const response = await api.get("/viewMessagesNotSeen/6");
        return response.data;
    }

    const [messages, setMessages] = useState([]);

    //Get Employee informations
    const retrieveEmployeeById = async () => {
        const response = await api.get("/employee/4");
        return response.data;
    }

    const [employee, setEmployee] = useState({});

    useEffect(() => {

        const getAllMessages = async () => {
            const allmessagesnotseen = await retrieveMessagesNotSeen();
            if (allmessagesnotseen) setMessages(allmessagesnotseen);
        }

        const getEmployee = async () => {
            const employee1 = await retrieveEmployeeById();
            if (employee1) setEmployee(employee1);
        }


        getAllMessages();
        getEmployee();
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
