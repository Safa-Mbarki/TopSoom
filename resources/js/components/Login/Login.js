import React, { useState } from "react";
import "./Login.css";

import Navbar from "../Navbar/Navbar";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState({
        email: "",
        password: "",
        error_list: [],
    });
    const handleShowClick = () => setShowPassword(!showPassword);
    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };
    const loginSubmit = (e) => {
        e.preventDefault();
        const Data = {
            email: login.email,
            password: login.password,
        };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("/api/login", Data).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_name", res.data.username);
                    swal("Success", res.data.message, "success");
                    navigate("/");
                } else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "warning");
                } else {
                    setLogin({
                        ...login,
                        error_list: res.data.validation_errors,
                    });
                }
            });
        });
    };
    return (
        <div>
            <div id="Body">
                <Navbar />
                <div id="container">
                    <div id="loginform" onSubmit={loginSubmit}>
                        <h2 id="headerTitle">Login</h2>
                        <div className="row">
                            <label>Username</label>
                            <input
                                placeholder="Enter your username"
                                type="text"
                                value={login.email}
                                onChange={handleChange}
                            />
                            <span>{login.error_list.email}</span>
                            <label>Password</label>
                            <input
                                placeholder="Enter your password"
                                type="password"
                                value={login.password}
                                onChange={handleChange}
                            />
                            <span>{login.error_list.password}</span>
                        </div>
                        <div id="button" className="row">
                            <button>Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
