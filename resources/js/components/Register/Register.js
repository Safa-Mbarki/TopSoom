import React, { useState } from "react";

import axios from "axios";
import Navbar from "../Navbar/Navbar";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "./Register";

function Register() {
    const navigate = useNavigate();
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        error_list: [],
    });
    const handleChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value });
    };
    const registerSubmit = (e) => {
        e.preventDefault();
        console.log(register);
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post(`/api/register`, register).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_name", res.data.username);
                    swal("Success", res.data.message, "success");
                    navigate("/");
                } else {
                    setRegister({
                        ...register,
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
                    <div id="loginform" onSubmit={registerSubmit}>
                        <h2 id="headerTitle">Register</h2>
                        <div className="row">
                            <label>Name</label>
                            <input
                                placeholder="Enter your name"
                                type="text"
                                value={register.name}
                                onChange={handleChange}
                            />
                            <label>Username</label>
                            <input
                                placeholder="Enter your username"
                                type="text"
                                value={register.email}
                                onChange={handleChange}
                            />
                            <span>{register.error_list.email}</span>
                            <label>Password</label>
                            <input
                                placeholder="Enter your password"
                                type="password"
                                value={register.password}
                                onChange={handleChange}
                            />
                            <span>{register.error_list.password}</span>
                        </div>
                        <div id="button" className="row">
                            <button>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
