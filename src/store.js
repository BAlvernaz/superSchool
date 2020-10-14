import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { studentReducer } from "./reducers/studentReducer";
import { schoolReducer } from "./reducers/schoolReducer";
import { togglerReducer } from "./reducers/togglerReducer";

const reducer = combineReducers({
  students: studentReducer,
  schools: schoolReducer,
  toggles: togglerReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
