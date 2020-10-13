import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { studentReducer } from "./reducers/studentReducer";
import { schoolReducer } from "./reducers/schoolReducer";

const reducer = combineReducers({
  students: studentReducer,
  schools: schoolReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
