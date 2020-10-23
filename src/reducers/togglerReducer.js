const { SIDEMENU_TOGGLE, EDIT_STUDENT_TOGGLE } = require("./toggleActions");

const initialState = {
  sideMenu: false,
  editStudentDialog: false
};

export const togglerReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIDEMENU_TOGGLE:
            state = {
              ...state,
              sideMenu: !state.sideMenu
            }
            break;
        case EDIT_STUDENT_TOGGLE:
          state = {
            ...state,
            editStudentDialog: !state.editStudentDialog
          }
    }
    return state
}