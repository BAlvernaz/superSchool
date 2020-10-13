import axios from "axios";

// Student Actions 
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
    studentId,
  });
  
  export const getStudents = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get("http://localhost:8000/api/students");
        dispatch(_getStudents(response.data));
      } catch (err) {
        // TODO: Change to a Error Reducer
        console.error(err);
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
        newStudent(response.data)
  
      } catch (err) {
        // TODO: Change to a Error Reducer
        console.error(err);
      }
    };
  };
  
  export const removeStudent = (studentId) => {
    return async (dispatch) => {
      try {
        await axios.delete(`http://localhost:8000/api/students/${studentId}`);
        dispatch(_removeStudent(studentId));
      } catch (err) {
        // TODO: Change to a Error Reducer
        console.error(err);
      }
    };
  };

//School Actions
const GET_SCHOOLS = "GET_SCHOOLS";

const _getSchools = schools => ({
    type: GET_SCHOOLS,
    schools
})

export const getSchools = () => {
    return async dispatch => {
        const response = await axios.get("http://localhost:8000/api/schools/")
        dispatch(_getSchools(response.data))
    }
}

export {
    GET_SCHOOLS,
    GET_STUDENTS,
    EDIT_STUDENT,
    REMOVE_STUDENT,
    ADD_STUDENT
}