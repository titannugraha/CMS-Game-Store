import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { calculateRange, sliceData } from "../../utils/table-pagination";
import { genreGet, genreGetById, genrePost, genrePut, genreDelete } from "../../fetch/genreFetch";

import "../styles.css";
import HeaderRight from "../../components/Header/right";

const Genres = () => {
  const [search, setSearch] = useState("");
  const [allGenres, setAllGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  const getGenres = () => {
    genreGet(result => {
      setAllGenres(result)
      setPagination(calculateRange(result, 5));
      setGenres(sliceData(result, page, 5));
    })
  }

  useEffect(() => {
    getGenres()
  }, []);

  // Handler Event
  // Add
  const [addVisible, setAddVisible] = useState(false)
  const [addForm, setAddForm] = useState({
    name: ""
  })
  const addHandler = (e) => {
    e.preventDefault()
    genrePost(addForm, () => {
      getGenres()
      setAddVisible(false)
    })
  }

  // Edit
  const [editVisible, setEditVisible] = useState(false)
  const [selectedId, setSelectedId] = useState(0)
  const [editForm, setEditForm] = useState({
    name: ""
  })
  const onEditHandler = (id) => {
    setSelectedId(id)
    genreGetById(id, result => {
      setEditForm(result)
    }).then(() => setEditVisible(true))
  }
  const editHandler = (e) => {
    e.preventDefault()
    genrePut(selectedId, editForm, () => {
      getGenres()
      setEditVisible(false)
    })
  }

  //Delete
  const deleteHandler = (id) => {
    genreDelete(id, () => {
      getGenres()
    })
  };

  // Search
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = allGenres.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
      );
      setPagination(calculateRange(search_results, 5));
      setGenres(sliceData(search_results, page, 5));
    } else {
      __handleChangePage(1);
    }
  };

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setPagination(calculateRange(allGenres, 5));
    setGenres(sliceData(allGenres, new_page, 5));
  };

  return (
    <div className="dashboard-content">
      <div className="dashbord-header-container">
        <button className="dashbord-header-btn" onClick={() => setAddVisible(true)}>
          Add Genre
        </button>
        <Modal show={addVisible} onHide={() => setAddVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Genre</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={addHandler}>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Name
                </label>
                <input type="name" className="form-control"
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setAddVisible(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={addHandler}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <HeaderRight />
      </div>

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Genre List</h2>
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
            <th>ID</th>
            <th>NAME</th>
            <th>Action</th>
          </thead>

          {genres.length !== 0 ? (
            <tbody>
              {genres.map((genre, index) => (
                <tr key={index}>
                  <td>
                    <span>{genre.id}</span>
                  </td>
                  <td>
                    <span>{genre.name}</span>
                  </td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        onClick={() => onEditHandler(genre.id)}
                        type="button"
                        className="btn btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteHandler(genre.id)}
                        type="button"
                        className="btn btn-danger"
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

        <Modal show={editVisible} onHide={() => setEditVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Genre</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={editHandler}>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Name
                </label>
                <input type="name" className="form-control"
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setEditVisible(false) }}>
              Close
            </Button>
            <Button variant="primary" onClick={editHandler}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {genres.length !== 0 ? (
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
    </div >
  );
};

export default Genres;
