import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
const EditUser = (props) => {
  const { formUser, setFormUser, show, handleClose, handlerSubmit } = props;

  return (
    <>
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
                />
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
                name='username'
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
                type="number"
                class="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">
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
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button
            onClick={() => handlerSubmit()}
            className="btn btn-info"
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUser;
