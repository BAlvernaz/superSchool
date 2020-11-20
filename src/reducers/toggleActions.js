const SIDEMENU_TOGGLE = "SIDEMENU_TOGGLE"
const EDIT_STUDENT_TOGGLE = "EDIT_STUDENT_TOGGLE"

export {
    SIDEMENU_TOGGLE,
    EDIT_STUDENT_TOGGLE
}

export const _toggleSideMenu = () => ({
    type: SIDEMENU_TOGGLE
})

export const _toggleEditStudentDialog = () => ({
    type: EDIT_STUDENT_TOGGLE
})

export const toggleSideMenu = () => {
    return dispatch => {
        dispatch(_toggleSideMenu())
    }
}

export const toggleEditStudentDialog = () => {
    return dispatch => {
        dispatch(_toggleEditStudentDialog())
    }
}
