import { GET_SCHOOLS, ADD_STUDENT } from '../reducers/actions'

export const schoolReducer = (state = [], action) => {
    switch(action.type) {
        case GET_SCHOOLS:
            state = [...state, ...action.schools]
            break;
        case ADD_STUDENT:
            state = state.map(school => {
                console.log(school)
                if (school.id === action.student.school) {
                    return {
                        ...school,
                        students: [...school.students, action.student]
                    }
                } 
                return school;
            })
            break;
    }
    return state
} 

