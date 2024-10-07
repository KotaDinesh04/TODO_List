import React, { useState } from "react";
import { NavBar } from "./NavBar";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar'  
export const Home = () => {
    const [flag, setFlag] = useState(false);
    const [ email,setEmail ] = useState("");
    const [ password,setPassword ] = useState("");
    const [progress, setProgress] = useState(0)
    const flip = () => {
        setFlag(true);
    };
    
    const handleEmailChange = async (e)=> {
        setEmail(e.target.value);
        // console.log(email);
    }

    const handlePasswordChange = async(e) => {
        setPassword(e.target.value);
    }

    const handleSubmitClick = async(e)=>{
        e.preventDefault();
        try {
            setProgress(20);
            const res = await axios.post('todolist-server-2x97wrfco-kotadinesh04s-projects.vercel.app/createtodo',{
                emailId: email,
                password: password
            });
            flip();
            setProgress(50);
            localStorage.setItem("emailId",email); 
            setProgress(100);
            navigate('/todolist');
        } catch(error) {
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    }

    const navigate = useNavigate();
    return (
        <div>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <NavBar flag={flag} />
            <div className="sign-in-page-home">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                            className="mx-auto h-10 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="/" method="POST" className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        onChange={handleEmailChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a
                                            href="/"
                                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        onChange={handlePasswordChange}
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleSubmitClick}
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            New user?{" "}
                            <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign Up Here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
