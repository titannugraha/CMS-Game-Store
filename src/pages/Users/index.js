import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";
import axios from "axios";

import Modal from "react-bootstrap/Modal";

import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/Header";

import Swal from "sweetalert2";
import "../styles.css";
import EditUser from "../../components/EditUser";
import { deleteUser, editUser, userById, userPut } from "../../fetch/userFetch";

const Users = ({ handlerClick }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const navigation = useNavigate();
  const [formUser, setFormUser] = useState([
    {
      id: 0,
      username: "",
      email: "",
      age: 0,
      image: "",
    },
  ]);

  const Url = "http://localhost:3000/uploads/";

  useEffect(() => {
    getData();
  }, [page, keywords]);

  //Axios Event
  const getData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3000/api/users?search_query=${keywords}&page=${page}&limit=${limit}`,
        headers: { user_token: localStorage.getItem("user_token") },
      });
      setUsers(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (err) {
      console.log(err);
    }
  };

  //Update

  // Handler Event

  //Change Page
  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg("");
    }
  };

  //Search
  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMsg("");
    setKeywords(query);
  };

  // //Edit
  const handleClose = () => {
    setShow(false);
  };
  const handlerSubmit = () => {
    editUser(formUser.id, formUser);
    setShow(false);
  };
  const handleShow = (id) => {
    userById(id, (result) => {
      setFormUser({
        id: result.id,
        username: result.username,
        email: result.email,
        age: result.age,
        image: result.image,
      });
      console.log(formUser);
    });
    setShow(true);
  };

  //Delete
  const deleteHandler = (id) => {
    deleteUser(id);
  };

  return (
    <div className="dashboard-content">
      <Header btnText="Welcome Back" event="user" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>User List</h2>
          <form onSubmit={(e) => searchData(e)}>
            <div className="dashboard-content-search">
              <input
                type="text"
                className="dashboard-content-input"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find something here..."
              />
              <button type="submit" className="btn btn-info">
                Search
              </button>
            </div>
          </form>
        </div>

        <table>
          <thead>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>IMAGE</th>
            <th>ROLE</th>
            <th>Action</th>
          </thead>

          {users.length !== 0 ? (
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <span>{user.username}</span>
                  </td>
                  <td>
                    <span>{user.email}</span>
                  </td>
                  <td>
                    <div>
                      <img
                        src={Url + user.image}
                        className="dashboard-content-avatar"
                        alt={user.username}
                      />
                    </div>
                  </td>
                  <td>
                    {user.id === 1 ? <span>Admin</span> : <span>Customer</span>}
                  </td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        class="btn btn-secondary "
                        onClick={() => handleShow(user.id)}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteHandler(user.id)}
                        className="btn btn-danger"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="text-center mb-3">
                <div>
                  <Link to={Url + formUser.image}>
                    <img
                      src={Url + formUser.image}
                      className="rounded"
                    />
                  </Link>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">
                  Username
                </label>
                <input
                  onChange={(e) =>
                    setFormUser({ ...formUser, username: e.target.value })
                  }
                  value={formUser.username}
                  type="text"
                  name="username"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">
                  Email
                </label>
                <input
                  onChange={(e) =>
                    setFormUser({ ...formUser, email: e.target.value })
                  }
                  value={formUser.email}
                  type="email"
                  class="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">
                  Age
                </label>
                <input
                  onChange={(e) =>
                    setFormUser({ ...formUser, age: e.target.value })
                  }
                  value={formUser.age}
                  type="number"
                  class="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">
                  Upload New Picture
                </label>
                <input
                  onChange={(e) =>
                    setFormUser({ ...formUser, image: e.target.files[0] })
                  }
                  type="file"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button onClick={() => handlerSubmit()} className="btn btn-info">
              Submit
            </button>
          </Modal.Footer>
        </Modal>
        <p>
          Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
        </p>
        <p className="has-text-centered has-text-danger">{msg}</p>

        <ReactPaginate
          previousLabel={"< Prev"}
          nextLabel={"Next >"}
          breakLabel={"..."}
          pageCount={Math.min(10, pages)}
          onPageChange={(e) => changePage(e)}
          containerClassName={"pagination-list"}
          pageLinkClassName={"pagination-link"}
          previousLinkClassName={"pagination-link"}
          nextLinkClassName={"pagination-link"}
          activeLinkClassName={"pagination-link is-current"}
          disabledLinkClassName={"pagination-link is-disabled"}
        />
      </div>
    </div>
  );
};

export default Users;
