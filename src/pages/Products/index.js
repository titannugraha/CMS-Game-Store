import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Header from "../../components/Header";

import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

import "../styles.css";
import {
  deleteGames,
  editGames,
  getGenre,
  getId,
} from "../../fetch/gameFetching";

const Products = () => {
  const [genre, setGenre] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [formGame, setFormGame] = useState([
    {
      idGames: 0,
      name: "",
      price: 0,
      release_date: new Date(),
      developer: "",
      publisher: "",
      desc: "",
      genres: 0,
      image: "",
      genresName: "",
    },
  ]);

  const navigation = useNavigate();
  const Url = "http://localhost:3000/uploads/";

  useEffect(() => {
    getProduct();
    getGenre((result) => {
      setGenre(result);
    });
    console.log(products);
  }, [page, keywords]);

  //Axios Event
  const getProduct = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3000/api/games?search_query=${keywords}&page=${page}&limit=${limit}`,
        headers: { user_token: localStorage.getItem("user_token") },
      });
      setProducts(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (err) {
      console.log(err);
    }
  };

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

  //Edit
  const handleClose = () => {
    setShow(false);
  };

  const handlerSubmit = () => {
    editGames(formGame.idGames, formGame, (result) => {
      console.log(result);
    });
    setShow(false);
  };
  const handleShow = (id) => {
    getId(id, (result) => {
      setFormGame({
        idGames: result.id,
        name: result.name,
        price: result.price,
        release_date: result.gameProfile.release_date,
        developer: result.gameProfile.developer,
        publisher: result.gameProfile.publisher,
        desc: result.gameProfile.desc,
        genres: result.genres[0].id,
        image: result.image,
        genresName: result.genres[0].name,
      });
      console.log(formGame);
    });
    setShow(true);
  };

  //Delete
  const deleteHandler = (id) => {
    deleteGames(id);
  };

  return (
    <div className="dashboard-content">
      <Header btnText="Add Product" event="product" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Product List</h2>
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
            <th>ID</th>
            <th>NAME</th>
            <th>IMAGE</th>
            <th>GENRE</th>
            <th>PRICE</th>
            <th>Action</th>
          </thead>

          {products.length !== 0 ? (
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <span>{product.id}</span>
                  </td>
                  <td>
                    <span>{product.name}</span>
                  </td>
                  <td>
                    <div>
                      <img
                        src={Url + product.image}
                        className="dashboard-content-avatar"
                      />
                    </div>
                  </td>
                  <td>
                    <span>{product.genres[0].name}</span>
                  </td>
                  <td>
                    <span>Rp.{product.price}</span>
                  </td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        onClick={() => handleShow(product.id)}
                        type="button"
                        class="btn btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteHandler(product.id)}
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
                  <Link to={Url + formGame.image}>
                    <img
                      src={Url + formGame.image}
                      className="img-fluid rounded-circle"
                    />
                  </Link>
                </div>
              </div>

              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">
                  Name
                </label>
                <input
                  onChange={(e) =>
                    setFormGame({ ...formGame, name: e.target.value })
                  }
                  value={formGame.name}
                  type="name"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">
                  Price
                </label>
                <input
                  onChange={(e) =>
                    setFormGame({ ...formGame, price: e.target.value })
                  }
                  value={formGame.price}
                  type="number"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">
                  Release Date
                </label>
                <input
                  onChange={(e) =>
                    setFormGame({ ...formGame, release_date: e.target.value })
                  }
                  value={formGame.release_date}
                  type="name"
                  disabled
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">
                  Developer
                </label>
                <input
                  onChange={(e) =>
                    setFormGame({ ...formGame, developer: e.target.value })
                  }
                  value={formGame.developer}
                  type="name"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">
                  Publisher
                </label>
                <input
                  onChange={(e) =>
                    setFormGame({ ...formGame, publisher: e.target.value })
                  }
                  value={formGame.publisher}
                  type="name"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">
                  Description
                </label>
                <textarea
                  onChange={(e) =>
                    setFormGame({ ...formGame, desc: e.target.value })
                  }
                  value={formGame.desc}
                  type="name"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">
                  Genre
                </label>
                <select
                  className="form-control"
                  onChange={(e) =>
                    setFormGame({ ...formGame, genres: e.target.value })
                  }
                >
                  <option selected disabled>
                    {formGame.genresName}
                  </option>
                  {genre.map((result, index) => {
                    const { id, name } = result;
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="mb-3">
                <label htmlFor="exampleInputPassword1" class="form-label">
                  Image
                </label>
                <input
                  onChange={(e) =>
                    setFormGame({ ...formGame, image: e.target.files[0] })
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
            <button className="btn btn-info" onClick={() => handlerSubmit()}>
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

export default Products;
