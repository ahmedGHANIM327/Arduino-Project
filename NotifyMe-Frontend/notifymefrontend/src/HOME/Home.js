import './Home.css';
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'
import { useState , useEffect } from 'react';
import api from '../Api/Notifyme';

export default function Home() {

    const navigate = useNavigate();
    const socket = io("http://localhost:4000");

    //Retreive all employees
    const retrieveEmployees = async () => {
        const response = await api.get("/employees/");
        return response.data;
    }

    const [allEmployees, setAllEmployees] = useState([])

    useEffect(() => {
        const getAllEmployees = async () => {
            const allemployees = await retrieveEmployees();
            if (allemployees) setAllEmployees(allemployees);
        }
        getAllEmployees();
    }, [])

    socket.on("send-id", (arg) => {  
        let id_badgeA = arg.replaceAll(" ","").trim();
        setTimeout(() => {  
            if(allEmployees.filter(employee => employee.id_badge===id_badgeA)[0]){
            navigate('/screen',{state:{id_badge:id_badgeA,id_employee:allEmployees.filter(employee => employee.id_badge===id_badgeA)[0].id}});
            }
        }, 1000);
        
    });

    return (
        <div id="home">
            <Button className='connexion' variant="contained" endIcon={<ArrowRightIcon />} onClick={() => navigate('/notifyme/')} color="error">Connexion</Button>
            <h1>Notify Me</h1>
        </div>
    )
}
