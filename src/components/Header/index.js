import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useNavigate } from "react-router-dom";

import "./styles.css";
import NotificationIcon from "../../assets/icons/notification.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import { addGame, getGenre } from "../../fetch/gameFetching";

const Header = ({ btnText, event }) => {
  const [formGame, setFormGame] = useState([
    {
      name: "",
      price: 0,
      release_date: new Date(),
      developer: "",
      publisher: "",
      desc: "",
      genres: 0,
      image: "",
    },
  ]);
  const [genre, setGenre] = useState([]);
  const [show, setShow] = useState(false);

  const navigation = useNavigate();

  useEffect(() => {
    getGenre((result) => {
      setGenre(result);
    });
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleYes= () =>{
    navigation('/')
  }

  const handlerSave = () => {
    addGame(formGame);
    console.log(formGame);
    // setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <div className="dashbord-header-container">
      <button className="dashbord-header-btn" onClick={handleShow}>
        {btnText}
      </button>
      {event === "product" ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">
                  Name
                </label>
                <input
                  onChange={(e) =>
                    setFormGame({ ...formGame, name: e.target.value })
                  }
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
                  type="date"
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
                  <option selected>Open this select menu</option>
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
            <button className="btn btn-secondary" onClick={() => handleClose()}>
              Close
            </button>
            <button onClick={() => handlerSave()} className="btn btn-info">
              Submit
            </button>
          </Modal.Footer>
        </Modal>
      ) : (
        null
      )}

    </div>
  );
};

export default Header;
