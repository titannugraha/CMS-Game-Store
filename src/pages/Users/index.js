import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

import all_users from "../../constants/users";
import { calculateRange, sliceData } from "../../utils/table-pagination";

import "../styles.css";

const Users = ({ handlerClick }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(all_users);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    setPagination(calculateRange(all_users, 5));
    setUsers(sliceData(all_users, page, 5));
  }, []);

  // Handler Click

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
      <Header btnText="Back to Home" event='user' />

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
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>

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
