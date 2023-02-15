import axios from "axios";
import Swal from "sweetalert2";

const apiDomain = process.env.REACT_APP_API_DOMAIN || "http://localhost:3000";
const URL = apiDomain + "/api/users";

const userLogin = async (data, cb) => {
  try {
    let result = await axios({
      method: "POST",
      url: URL + "/login",
      data,
    });
    cb(result.data);
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

const checkAdmin = async (data, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + "/user",
      headers: { user_token: data },
    });
    if (result.data.id !== 1) {
      throw Error("You are not an administrator");
    }
    cb(result.data);
  } catch (error) {
    console.log(error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const userGetById = async (cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + "/user",
      headers: { user_token: localStorage.getItem("user_token") },
    });
    cb(result.data);
  } catch (error) {
    console.log(error);
  }
};

const userById = async (id, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + `/user/${id}`,
      headers: { user_token: localStorage.getItem("user_token") },
    });
    cb(result.data);
  } catch (error) {
    console.log(error);
  }
};

const userPut = async (data, cb) => {
  try {
    let result = await axios({
      method: "PUT",
      url: URL + "/user/update",
      headers: {
        "Content-Type": "multipart/form-data",
        user_token: localStorage.getItem("user_token"),
      },
      data,
    });
    cb(result.data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
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

const editUser = async (id, data) => {
  try {
    let result = await axios({
      method: "PUT",
      url: URL + `${id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        user_token: localStorage.getItem("user_token"),
      },
      data: data,
    });
    console.log(result.data);
    Swal.fire("Edit Item", "Your Data has been Updated!", "success");
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (cb, word, limit, page) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + `?search_query=${word}&page=${page}&limit=${limit}`,
      headers: { user_token: localStorage.getItem("user_token") },
    });
    cb(result.data);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await axios({
          method: "DELETE",
          url: URL + `/${id}`,
          headers: { user_token: localStorage.getItem("user_token") },
        });
        
        Swal.fire(
          "Deleted!",
          `Your result with id ${id} has been deleted.`,
          "success"
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
};
export {
  userLogin,
  checkAdmin,
  userGetById,
  userPut,
  getUser,
  userById,
  deleteUser,
};
