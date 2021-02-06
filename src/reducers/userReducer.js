import { LOGIN, LOGOUT, EDIT_USER, USER_CHECK} from "./actions"

 
export const userReducer = (state = {}, action) => {
    switch(action.type) {
        case LOGIN:
        case USER_CHECK:
            state = {...state, ...action.data}
            break;
        case LOGOUT:
            state = {}
            break;
        case EDIT_USER:
            state = {...state, ...action.user }
            break;
    }
    return state
}