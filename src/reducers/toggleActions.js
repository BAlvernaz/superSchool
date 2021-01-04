const SIDEMENU_TOGGLE = "SIDEMENU_TOGGLE"
const USER_FORM_DIALOG_TOGGLE ="USER_FORM_DIALOG_TOGGLE"
const LOGIN_FORM_DIALOG_TOGGLE = "LOGIN FORM DIALOG"

export {
    SIDEMENU_TOGGLE,
    USER_FORM_DIALOG_TOGGLE,
    LOGIN_FORM_DIALOG_TOGGLE
}
 const _toggleSideMenu = () => ({
    type: SIDEMENU_TOGGLE
})
 const _toggleDialog = () => ({
     type: USER_FORM_DIALOG_TOGGLE
 })

 const _toggleLogin = () => ({
     type: LOGIN_FORM_DIALOG_TOGGLE
 })
export const toggleSideMenu = () => {
    return dispatch => {
        dispatch(_toggleSideMenu())
    }
}

export const toggleDialog = () => {
    return dispatch => {
        dispatch(_toggleDialog())
    }
}

export const toggleLogin = () => {
    return dispatch => {
        dispatch(_toggleLogin())
    }
}


