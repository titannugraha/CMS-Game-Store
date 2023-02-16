import axios from "axios";
import Swal from "sweetalert2";

const apiDomain = process.env.REACT_APP_API_DOMAIN || "http://localhost:3000";
const URL = apiDomain + "/api/orders/";
const url = apiDomain + "/api/transactions/";

const getOrder = async (cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: url,
      headers: { user_token: localStorage.getItem("user_token") },
    });
    cb(result.data);
  } catch (err) {
    console.log(err);
  }
};

const editOrder = async (id, data) => {
  try {
    let result = await axios({
      method: "PUT",
      url: url + `${id}`,
      headers: {
        user_token: localStorage.getItem("user_token"),
      },
      data: data,
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    window.location.reload(false);
  } catch (error) {
    console.log(error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error.response.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const getOrderId = async (id, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: url + `${id}`,
      headers: { user_token: localStorage.getItem("user_token") },
    });
    cb(result.data);
  } catch (err) {
    console.log(err);
  }
};
export { getOrder, getOrderId, editOrder };
