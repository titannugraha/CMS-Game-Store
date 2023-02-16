import axios from 'axios'
import Swal from 'sweetalert2'

const apiDomain = process.env.REACT_APP_API_DOMAIN || 'http://localhost:3000'
const URL = apiDomain + '/api/genres/'

const genreGet = async (cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: URL
        })
        cb(result.data)
    } catch (error) {
        console.log(error)
    }
}

const genreGetById = async (id, cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: URL + 'genre/' + id
        })
        cb(result.data)
    } catch (error) {
        console.log(error)
    }
}

const genrePost = async (data, cb) => {
    try {
        let result = await axios({
            method: 'POST',
            url: URL,
            headers: { 'user_token': localStorage.getItem('user_token') },
            data
        })
        cb(result.data)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    } catch (error) {
        console.log(error)
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1500
        })
    }
}

const genrePut = async (id, data, cb) => {
    try {
        let result = await axios({
            method: 'PUT',
            url: URL + id,
            headers: { 'user_token': localStorage.getItem('user_token') },
            data
        })
        cb(result.data)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    } catch (error) {
        console.log(error)
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1500
        })
    }
}

const genreDelete = async (id, cb) => {
    try {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await axios({
                    method: 'DELETE',
                    url: URL + id,
                    headers: { 'user_token': localStorage.getItem('user_token') }
                })
                cb(res.data)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    } catch (error) {
        console.log(error)
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1500
        })
    }
}

export {
    genreGet, genreGetById, genrePost, genrePut, genreDelete
}