import axios from "axios";

//Student Reducer Actions

const GET_STUDENTS = "GET_STUDENTS";
const REMOVE_STUDENT = "REMOVE_STUDENT";
const EDIT_STUDENT = "EDIT_STUDENT";
const ADD_STUDENT = "ADD_STUDENT";

const _getStudents = (students) => ({
  type: GET_STUDENTS,
  students,
});

const _addStudent = (student) => ({
  type: ADD_STUDENT,
  student,
});

const _removeStudent = (studentId) => ({
  type: REMOVE_STUDENT,
  studentId
}) 

export const getStudents = () => {
  return async (dispatch) => {
    try {
    const response = await axios.get("http://localhost:8000/api/students");
    dispatch(_getStudents(response.data));
    } catch (err) {
      // TODO: Change to a Error Reducer
        console.error(err)
    }
  };
};

export const addStudent = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/students/",
        data
      );
      dispatch(_addStudent(response.data));
    } catch (err) {
      // TODO: Change to a Error Reducer
      console.error(err);
    }
  };
};

export const removeStudent = (studentId) => {
  return async (dispatch) => {
    try {
    await axios.delete(`http://localhost:8000/api/students/${studentId}`)
    dispatch(_removeStudent(studentId))
    } catch (err) {
      // TODO: Change to a Error Reducer
      console.error(err)
    }
  }
}

export const studentReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STUDENTS:
      state = [...state, ...action.students];
      break;
    case ADD_STUDENT:
      state = [...state, action.student];
      break;
    case REMOVE_STUDENT:
      state = state.filter(student => student.id !== action.studentId)
      break;
  }
  return state;
};
