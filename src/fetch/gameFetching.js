import axios from "axios";
import Swal from "sweetalert2";

const apiDomain = process.env.REACT_APP_API_DOMAIN || "http://localhost:3000";
const URL = apiDomain + "/api/games/";
const URLG = apiDomain + "/api/genres/";

const deleteGames = async (id) => {
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
          url: URL + `${id}`,
          headers: { user_token: localStorage.getItem("user_token") },
        });
        Swal.fire(
          "Deleted!",
          `Your result with id ${id} has been deleted.`,
          "success"
        );
        window.location.reload(false);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const addGame = async (data) => {
  try {
    let result = await axios({
      method: "POST",
      url: URL,
      headers: {
        "Content-Type": "multipart/form-data",
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

const getId = async (id, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + `game/${id}`,
    });
    cb(result.data);
  } catch (error) {
    console.log(error);
  }
};

const editGames = async (id, data, cb) => {
  try {
    let result = await axios({
      method: "PUT",
      url: URL + `${id}`,
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

const getGenre = async (cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URLG,
      headers: { user_token: localStorage.getItem("user_token") },
    });
    cb(result.data);
  } catch (err) {
    console.log(err);
  }
};

export { deleteGames, addGame, getGenre, getId, editGames };
