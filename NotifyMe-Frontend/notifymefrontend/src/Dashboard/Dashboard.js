import React from 'react'
import api from '../Api/Notifyme'
import { useState , useEffect } from 'react';

export default function Dashboard() {

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

    return (
        <div >
            {allEmployees.map((employee) => employee.name)}
         
        </div>
    )
}
