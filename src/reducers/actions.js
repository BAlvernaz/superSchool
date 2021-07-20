import axios from "axios";
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.withCredentials = true;

// Student Actions 
const GET_STUDENTS = "GET_STUDENTS";
const REMOVE_STUDENT = "REMOVE_STUDENT";
const EDIT_USER = "EDIT_USER";
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
          "http://localhost:8000/api/auth/reg/",
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

//USER ACTION

const LOGIN = "LOGIN"
const USER_CHECK = "USER_CHECK"
const LOGOUT ="LOGOUT"

const _login = (data) => ({
  type: LOGIN,
  data
})

const _userCheck = (data) => ({
  type: USER_CHECK,
  data
})

const _logout = () => ({
  type: LOGOUT
})

export const login = (creds) => {
  return async dispatch => {
    try {
    const loginResponse = await axios.post("http://localhost:8000/api/auth/login/", creds)
    if (loginResponse.status === 200) {
      const userInfoResponse = await axios.get("http://localhost:8000/api/auth/user")
      return dispatch(_login(userInfoResponse.data))
    }
    } catch (err) {
      console.error(err)
      // TODO: Change to an Error Reducer
    }
  }
}

export const logout = () => {
  return async dispatch => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth/logout/")
      if (response.status === 200) {
        return dispatch(_logout())
      }
    } catch (err) {
      console.error(err)
      // TODO: Change to an Error Reducer
    }
  }
}

export const userCheck = () => {
  return async dispatch => {
    try {
      const response = await axios.get("http://localhost:8000/api/auth/user")
      return dispatch(_userCheck(response.data))
    } catch (err) {
      console.error(err)
      return dispatch(_logout())
    }
  }
}

  const _editUser = (user, id) => ({
    type: EDIT_USER,
    user,
    id
  })
  // Updates User Account and Students Profile (User and Students Reducers)
  export const editUser = (data, id) => {
    return async dispatch => {
      try {
        const response  = await axios.put(`http://localhost:8000/api/auth/user/`, data)
        dispatch(_editUser(response.data, id))
      } catch (err) {
        // TODO: Change to a Error Reducer
        console.error(err)
      }
    }
  }


export {
    GET_SCHOOLS,
    GET_STUDENTS,
    EDIT_USER,
    REMOVE_STUDENT,
    ADD_STUDENT,
    LOGIN,
    LOGOUT,
    USER_CHECK
}



