import { LOGIN } from "./actions"

 
export const userReducer = (state = {}, action) => {
    switch(action.type) {
        case LOGIN:
            state = {...state, ...action.data}
            break;
    }
    return state
}