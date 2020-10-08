import axios from "axios";

//Student Reducer Actions

const GET_USERS = "GET_USERS";
const REMOVE_USER = "REMOVE_USER";
const EDIT_USER = "EDIT_USER";
const ADD_STUDENT = "ADD_STUDENT";

const _getStudents = (students) => ({
  type: GET_USERS,
  students,
});

const _addStudent = (student) => ({
  type: ADD_STUDENT,
  student,
});

export const addStudent = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/students/",
        data
      );
      dispatch(_addStudent(response.data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getStudents = () => {
  return async (dispatch) => {
    try {
    const response = await axios.get("http://localhost:8000/api/students");
    dispatch(_getStudents(response.data));
    } catch (err) {
        console.error(err)
    }
  };
};

export const studentReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      state = [...state, ...action.students];
      break;
    case ADD_STUDENT:
      state = [...state, action.student];
      break;
  }
  return state;
};
