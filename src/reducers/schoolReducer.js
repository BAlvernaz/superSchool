import axios from "axios";

const GET_SCHOOLS = "GET_SCHOOLS";

const _getSchools = schools => ({
    type: GET_SCHOOLS,
    schools
})

export const getSchools = () => {
    return async disptach => {
        const response = await axios.get("http://localhost:8000/api/schools/")
        disptach(_getSchools(response.data))
    }
}

export const schoolReducer = (state = [], action) => {
    switch(action.type) {
        case GET_SCHOOLS:
            console.log(action.schools)
            state = [...state, ...action.schools]
            break;
    }
    return state
} 

