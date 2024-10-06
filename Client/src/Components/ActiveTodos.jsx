import React, { useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import axios from 'axios'

export const ActiveTodos = () => {
    const [email, setEmail] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const mail = localStorage.getItem("emailId");
        setEmail(mail);
    }, []);

    useEffect(() => {
        if (email) {
            try {
                const fetchData = async () => {
                    const val = await axios.get('http://localhost:5000/api/gettodos', {
                        params: {
                            emailId: email
                        }
                    });
                    if (val.data) {
                        setTodos(val.data);
                    }
                }
                fetchData();
                // console.log(todos);
            } catch (error) {
                console.log(error);
            }
        }
    }, [email]);
    return (
        <div>
            <NavBar flag={true} />
            {todos.map((todo,index)=>{
                return (
                    <h1 key={index}>{todo.name}</h1>
                )
            })}
        </div>
    )
}
