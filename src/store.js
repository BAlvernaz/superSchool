import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const reducer = combineReducers({
     students: studentReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store