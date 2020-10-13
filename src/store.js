import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { studentReducer, getStudents, addStudent, removeStudent } from "./reducers/studentReducer";
import { schoolReducer, getSchools } from "./reducers/schoolReducer";

const reducer = combineReducers({
  students: studentReducer,
  schools: schoolReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export {
  getStudents,
  addStudent,
  removeStudent,
  getSchools
}