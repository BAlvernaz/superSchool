const { SIDEMENU_TOGGLE } = require("./toggleActions");

const initialState = {
  sideMenu: false,
};

export const togglerReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIDEMENU_TOGGLE:
            state = {
              ...state,
              sideMenu: !state.sideMenu
            }
            break;
    }
    return state
}