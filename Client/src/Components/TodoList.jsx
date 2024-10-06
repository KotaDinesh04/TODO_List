import { React, useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import axios from 'axios';

export const TodoList = () => {
    const flag = true;
    const [emailId, setEmailId] = useState("");
    const [data, setData] = useState([]);

    // Fetch the email and make API request after emailId is set
    useEffect(() => {
        const email = localStorage.getItem("emailId");
        if (email) {
            setEmailId(email);
        }
    }, []); // Runs once on component mount to retrieve email

    // Make the API call after emailId is updated
    useEffect(() => {
        const fetchTodos = async () => {
            if (emailId) {
                try {
                    const res = await axios.get('http://localhost:5000/api/gettodos', {
                        params: { emailId: emailId },
                    });
                    setData(res.data); // Set response data
                    console.log(res.data);
                } catch (error) {
                    console.error("Error fetching TODOs", error);
                }
            }
        };

        fetchTodos();
    }, [emailId]); // Only run when emailId is set

    return (
        <div>
            <NavBar flag={flag} />

        </div>
    );
};
