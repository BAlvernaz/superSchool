import axios from "axios";

const GET_SCHOOLS = "GET_SCHOOLS";
const NEW_STUDENT = "NEW_STUDENT"

const _getSchools = schools => ({
    type: GET_SCHOOLS,
    schools
})

const _newStudent = student => ({
    type: NEW_STUDENT,
    student
})

export const getSchools = () => {
    return async dispatch => {
        const response = await axios.get("http://localhost:8000/api/schools/")
        dispatch(_getSchools(response.data))
    }
}

export const newStudent = student => {
    return dispatch => {
        dispatch(_newStudent(student))
    }
}

export const schoolReducer = (state = [], action) => {
    switch(action.type) {
        case GET_SCHOOLS:
            state = [...state, ...action.schools]
            break;
        case NEW_STUDENT:
            state = state.map(school => {
                console.log(school)
                if (school.id === action.student.school) {
                    return {
                        ...school,
                        students: [...students, action.student]
                    }
                } 
                return school;
            })
            break;
    }
    return state
} 

