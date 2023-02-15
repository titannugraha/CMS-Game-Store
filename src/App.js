import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideBar from "./components/Sidebar";
import sidebar_menu from "./constants/sidebar-menu";

import Orders from "./pages/Orders";
import Users from "./pages/Users";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Products from "./pages/Products";
import Login from "./pages/Login";

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [loading, setLoading] = useState(true)

  const loginHandler = (result) => {
    setLoginStatus(result)
  }

  useEffect(() => {
    if (localStorage.getItem('user_token')) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
    setLoading(false)
  }, [loginStatus])
  return (
    <Router>
      {loading ?
        <div></div>
        : loginStatus ?
          <div className="dashboard-container">
            <SideBar menu={sidebar_menu} loginStatus={loginStatus} loginHandler={loginHandler} />

            <div className="dashboard-body">
              <Routes>
                <Route path="*" element={<div></div>} />
                <Route exact path="/" element={<div></div>} />
                <Route exact path="/orders" element={<Orders />} />
                <Route exact path="/products" element={<Products />} />
                <Route exact path="/users" element={<Users />} />
              </Routes>
            </div>
          </div>
          :
          <Routes>
            <Route path="*" element={<Login loginStatus={loginStatus} loginHandler={loginHandler} />} />
          </Routes>
      }
    </Router >
  );
}

export default App;
