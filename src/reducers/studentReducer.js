import { GET_STUDENTS, ADD_STUDENT, REMOVE_STUDENT, EDIT_STUDENT } from './actions'

export const studentReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STUDENTS:
      state = [...state, ...action.students];
      break;
    case ADD_STUDENT:
      state = [...state, action.student];
      break;
    case REMOVE_STUDENT:
      state = state.filter((student) => student.id !== action.studentId);
      break;
    case EDIT_STUDENT:
      state = [...state].map(student => {
        if (student.id !== action.student.id) {
          return student
        }
          return action.student
      })
      break;
  }
  return state;
};
