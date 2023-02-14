import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Header from "../../components/Header";

import all_users from "../../constants/users";
import { calculateRange, sliceData } from "../../utils/table-pagination";

import Swal from "sweetalert2";
import "../styles.css";

const Users = ({ handlerClick }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(all_users);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [show, setShow] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    setPagination(calculateRange(all_users, 5));
    setUsers(sliceData(all_users, page, 5));
  }, []);

  // Handler Event

  //Edit
  const handleClose = () => {
    setShow(false);
  };

  const handleSave = () => {
    setShow(false);
    navigation("/products");
  };
  const handleShow = () => setShow(true);

  //Delete
  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  // Search
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = users.filter(
        (item) =>
          item.first_name.toLowerCase().includes(search.toLowerCase()) ||
          item.last_name.toLowerCase().includes(search.toLowerCase()) ||
          item.username.toLowerCase().includes(search.toLowerCase()) ||
          item.product.toLowerCase().includes(search.toLowerCase())
      );
      setUsers(search_results);
    } else {
      __handleChangePage(1);
    }
  };

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setUsers(sliceData(all_users, new_page, 5));
  };

  return (
    <div className="dashboard-content">
      <Header btnText="Back to Home" event="user" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>User List</h2>
          <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              className="dashboard-content-input"
              onChange={(e) => __handleSearch(e)}
            />
          </div>
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
                        src={user.avatar}
                        className="dashboard-content-avatar"
                        alt={user.first_name + " " + user.last_name}
                      />
                    </div>
                  </td>
                  <td>
                    <span>{user.role}</span>
                  </td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        onClick={() => handleShow()}
                        type="button"
                        class="btn btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteHandler()}
                        type="button"
                        class="btn btn-danger"
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
                  <img
                    src="https://reqres.in/img/faces/7-image.jpg"
                    className="dashboard-content-avatar"
                    alt="Titan Nugraha"
                  />
                </div>
                <span>Titan Nugraha</span>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Username
                </label>
                <input type="name" class="form-control" />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Email
                </label>
                <input type="email" class="form-control" />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Age
                </label>
                <input type="number" class="form-control" />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Upload New Picture
                </label>
                <input
                  type="file"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

      

        {users.length !== 0 ? (
          <div className="dashboard-content-footer">
            {pagination.map((item, index) => (
              <span
                key={index}
                className={item === page ? "active-pagination" : "pagination"}
                onClick={() => __handleChangePage(item)}
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="dashboard-content-footer">
            <span className="empty-table">No data</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
