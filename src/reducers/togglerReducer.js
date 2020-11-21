const { SIDEMENU_TOGGLE, USER_FORM_DIALOG_TOGGLE } = require("./toggleActions");

const initialState = {
  sideMenu: false,
  userFormDialog: false
};

export const togglerReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIDEMENU_TOGGLE:
            state = {
              ...state,
              sideMenu: !state.sideMenu
            }
            break;
        case USER_FORM_DIALOG_TOGGLE:
            state = {
              ...state,
              userFormDialog: !state.userFormDialog
            }
    }
    return state
}