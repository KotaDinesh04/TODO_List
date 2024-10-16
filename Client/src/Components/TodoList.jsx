import { React, useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import axios from 'axios';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { ActiveTodos } from './ActiveTodos';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import { format } from 'date-fns';
import LoadingBar from 'react-top-loading-bar'

export const TodoList = () => {
    const flag = true;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [progress, setProgress] = useState(0)

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        // console.log(title);
    }

    const handleDescChange = (e) => {
        setDescription(e.target.value);
    }

    const handleAddClick = async () => {
        try {
            setProgress(30);
            const data = await axios.post('https://server-pi-gold.vercel.app/api/createtodo', {
                name: title,
                description: description,
                emailId: localStorage.getItem('emailId')
            });
            setProgress(70);
            if (data) {
                alert("Successfully created todo");
                setProgress(100);
                renderTodos();
            } else {
                alert("Error creating todo");
            }
        } catch (error) {
            alert(error);
        }
    }

    const [todos, setTodos] = useState([]);
    const renderTodos = async () => {
        setProgress(30);
        try {
            const data = await axios.get('https://server-pi-gold.vercel.app/api/gettodos', {
                params: {
                    emailId: localStorage.getItem('emailId'),
                }
            });
            setProgress(70);
            setTodos(data.data);
            // renderTodos();
            setProgress(100);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        renderTodos();
    }, []);

    const handleCheckChange = async (id) => {
        try {
            setProgress(30);
            const data = await axios.get('https://server-pi-gold.vercel.app/api/gettodousingid', {
                params: {
                    id: id
                }
            });
            setProgress(70);
            if (!data) {
                console.log("Error");
            }
            const todo = data.data;
            todo.completed = !todo.completed;
            await axios.post('https://server-pi-gold.vercel.app/api/updatetodo', {
                id: todo._id,
                name: todo.name,
                description: todo.description,
                emailId: localStorage.getItem('emailId'),
                completed: todo.completed,
            });
            renderTodos();
            setProgress(100);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <NavBar flag={flag} />
            <Typography variant='h5' color='primary' style={{ textAlign: 'center', marginTop: '5vh' }}>Add a new todo</Typography>
            <div className="add-container-todolist">
                <TextField id="outlined-basic" label="Enter the todo title" variant="outlined" onChange={handleTitleChange} style={{ marginRight: "2vw", marginBottom: '2vh' }} required />
                <TextField id="outlined-basic" label="Enter the todo description" variant="outlined" onChange={handleDescChange} style={{ marginRight: "2vw", marginBottom: '2vh' }} />
                <button onClick={handleAddClick}><AddCircleOutlinedIcon fontSize='large' color='primary'></AddCircleOutlinedIcon></button>
            </div>
            <div className="todos-container-todolist">
                {todos.map((todo, index) => {
                    if (!todo.completed) {
                        return (
                            <Card variant="outlined" className="todolist-display-card" sx={{ maxWidth: 360 }} key={index} >
                                <Box sx={{ p: 2 }}>
                                    <Stack
                                        direction="row"
                                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                        <Typography gutterBottom variant="h5" component="div">
                                            {todo.name}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox />} label="Complete" color='primary' onChange={() => handleCheckChange(todo._id)} />
                                            </FormGroup>
                                        </Typography>
                                    </Stack>
                                </Box>
                                <Divider />
                                <Box sx={{ p: 2 }}>
                                    <Typography gutterBottom variant="body2">
                                        Description: {todo.description}
                                    </Typography>
                                    {/* <Stack direction="row" spacing={1}>
                                    
                                </Stack> */}
                                </Box>
                            </Card>
                        )
                    }
                })}
            </div>
            {/* <h1>completed</h1> */}
            <div className="todos-container-todolist">
                {todos.map((todo, index) => {
                    if (todo.completed) {
                        return (
                            <Card variant="outlined" className="todolist-display-card-completed" sx={{ maxWidth: 360 }} key={index} >
                                <Box sx={{ p: 2 }}>
                                    <Stack
                                        direction="row"
                                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                        <Typography gutterBottom variant="h5" component="div">
                                            {todo.name}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox defaultChecked />} label="Complete" color='primary' onChange={() => handleCheckChange(todo._id)} />
                                            </FormGroup>
                                        </Typography>
                                    </Stack>
                                </Box>
                                <Divider />
                                <Box sx={{ p: 2 }}>
                                    <Typography gutterBottom variant="body2">
                                        Description: {todo.description}
                                    </Typography>
                                    {/* <Stack direction="row" spacing={1}>
                                    
                                </Stack> */}
                                </Box>
                            </Card>
                        )
                    }
                })}
            </div>
        </div>
    );
};
