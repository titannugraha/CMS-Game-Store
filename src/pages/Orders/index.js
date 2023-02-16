import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

import { BsThreeDotsVertical } from "react-icons/bs";
import "../styles.css";
import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import RefundedIcon from "../../assets/icons/refunded.svg";
import { editOrder, getOrder, getOrderId } from "../../fetch/orderFetching";

const Orders = () => {
  const [id, setId] = useState(false);
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [formStatus, setFormStatus] = useState([
    {
      status: "",
    },
  ]);
  useEffect(() => {
    getOrder((result) => {
      setOrders(result);
    });
  }, []);

  const URL = "http://localhost:3000/uploads/";

  //Handler Click
  const handleClose = () => {
    setShow(false);
    editOrder(id, formStatus);
  };

  const handlerPaid = (id) => {
    setShow(true);
    setId(id)
  };

  return (
    <div className="dashboard-content">
      <Header btnText="Welcome Back" event="home" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Orders List</h2>
        </div>

        <table>
          <thead>
            <th>ID</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>COSTUMER</th>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>Action</th>
          </thead>

          {orders.length !== 0 ? (
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <span>{order.id}</span>
                  </td>
                  <td>
                    <span>{order.createdAt}</span>
                  </td>
                  <td>
                    <div>
                      {order.status === "Paid" ? (
                        <img
                          src={DoneIcon}
                          alt="paid-icon"
                          className="dashboard-content-icon"
                        />
                      ) : order.status === "Canceled" ? (
                        <img
                          src={CancelIcon}
                          alt="canceled-icon"
                          className="dashboard-content-icon"
                        />
                      ) : order.status === "Pending" ? (
                        <img
                          src={RefundedIcon}
                          alt="refunded-icon"
                          className="dashboard-content-icon"
                        />
                      ) : null}
                      <span>{order.status}</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <img
                        src={URL + order.user.image}
                        className="dashboard-content-avatar"
                        alt={order.user.name}
                      />
                      <span>{order.user.name}</span>
                    </div>
                  </td>
                  <td>
                    <span>{order.orders[0].game.name}</span>
                  </td>
                  <td>
                    <span>Rp.{order.total_price}</span>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="light">
                        <BsThreeDotsVertical />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handlerPaid(order.id)}>
                          Change Status
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <Modal show={show} onHide={handleClose} id={id}>
          <Modal.Header closeButton>
            <Modal.Title>Change Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <select
                className="form-control"
                onChange={(e) =>
                  setFormStatus({ ...formStatus, status: e.target.value })
                }
              >
                <option selected disable>
                  Choose the status
                </option>
                <option value="Paid"> Paid </option>
                <option value="Canceled"> Canceled </option>
                <option value="Pending"> Pending</option>
              </select>
            </form>
            Are You Sure for change the status ?
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleClose}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Orders;
