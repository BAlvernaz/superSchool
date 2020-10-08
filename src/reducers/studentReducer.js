import axios from 'axios'

//Student Reducer Actions

const GET_USERS =  "GET_USERS"
const REMOVE_USER = "REMOVE_USER"
const EDIT_USER = "EDIT_USER"
const ADD_USER = "ADD_USER"

const _getUsers = students => ({
    type: GET_USERS,
    students
})

export const getUsers = () => {
    return async dispatch => {
        const response = await axios.get("http://localhost:8000/api/students")
        return dispatch(_getUsers)
    }
} 