import { LOGIN, USER_CHECK, LOGOUT } from "./actions"

 
export const userReducer = (state = {}, action) => {
    switch(action.type) {
        case LOGIN:
        case USER_CHECK:
            state = {...state, ...action.data}
            break;
        case LOGOUT:
            state = {}
            break 
    }
    return state
}