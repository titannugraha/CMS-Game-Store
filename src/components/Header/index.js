import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useNavigate } from "react-router-dom";

import "./styles.css";
import HeaderRight from "./right";

const Header = ({ btnText, event }) => {
  const [show, setShow] = useState(false);

  const navigation = useNavigate();

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = () => {
    setShow(false);
    navigation("/");
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
                <label for="exampleInputEmail1" class="form-label">
                  Name
                </label>
                <input
                  type="name"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Genre
                </label>
                <select className="form-control">
                  <option selected>Open this select menu</option>
                  <option value="Action">Action</option>
                  <option value="Sport">Sport</option>
                  <option value="Adventurer">Adventurer</option>
                  <option value="RPG">RPG</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Image
                </label>
                <input
                  type="file"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Price
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Check me out
                </label>
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
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure ? </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleSave}>
              Yes !
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <HeaderRight />
    </div>
  );
};

export default Header;
