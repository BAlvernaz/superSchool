import { GET_SCHOOLS, ADD_STUDENT, REMOVE_STUDENT, EDIT_STUDENT } from "../reducers/actions";

export const schoolReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SCHOOLS:
      state = [...state, ...action.schools];
      break;
    case ADD_STUDENT:
      state = state.map((school) => {
        if (school.id === action.student.school) {
          return {
            ...school,
            students: [...school.students, action.student],
          };
        }
        return school;
      });
      break;
    case REMOVE_STUDENT:
      state = [...state].map(school => {
        return {
          ...school,
          students: [...school.students].filter(student => student.id !== action.studentId)
        }
      })
    case EDIT_STUDENT:
      state = [...state].map(school => {
        if (school.id !== action.student.school) {
          return {
            ...school,
            students: [...school.students].filter(student => student.school !== school.id)
          }
        }
        return {
          ...school,
          students: [...school.students, action.student]
        }
      })
  }
  return state;
};
