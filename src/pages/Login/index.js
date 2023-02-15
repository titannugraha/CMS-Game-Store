import React, { useState, useEffect } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { userLogin, checkAdmin } from '../../fetch/userFetch'

const Login = (props) => {
    const { loginStatus, loginHandler } = props
    const [form, setForm] = useState({
        usernameOrEmail: '',
        password: ''
    })

    const submitHandler = (e) => {
        e.preventDefault()
        userLogin(form, result => {
            localStorage.setItem('user_token', result.user_token)
            checkAdmin(result.user_token, result => {
                loginHandler(true)
                console.log(result)
            })
        })
    }

    const navigation = useNavigate()
    useEffect(() => {
        if (loginStatus) {
            navigation('/')
        }
    }, [loginStatus, navigation])

    return (
        <>
            <div className="container">
                <div className="row main-login">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="cards border-0 shadow rounded-3">
                            <div className="card-body p-4 p-sm-5">
                                <form onSubmit={submitHandler}>
                                    <h5 className="card-title text-center fw-bold mb-5 fw-light fs-5">
                                        Sign In
                                    </h5>
                                    <div className="form-floating mb-3">
                                        <input
                                            onChange={(e) => setForm({ ...form, usernameOrEmail: e.target.value })}
                                            type="username"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                        />
                                        <label for="floatingInput">Username</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            onChange={(e) =>
                                                setForm({ ...form, password: e.target.value })
                                            }
                                            type="password"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Password"
                                        />
                                        <label for="floatingPassword">Password</label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="rememberPasswordCheck"
                                        />
                                        <label
                                            className="form-check-label"
                                            for="rememberPasswordCheck"
                                        >
                                            Remember password
                                        </label>
                                    </div>
                                    <div className="d-grid">
                                        <button
                                            className="btn text-uppercase fw-bold"
                                            type="submit"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;