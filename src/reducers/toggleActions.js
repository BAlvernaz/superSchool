const SIDEMENU_TOGGLE = "SIDEMENU_TOGGLE"
const USER_FORM_DIALOG_TOGGLE ="USER_FORM_DIALOG_TOGGLE"
export {
    SIDEMENU_TOGGLE,
    USER_FORM_DIALOG_TOGGLE
}
 const _toggleSideMenu = () => ({
    type: SIDEMENU_TOGGLE
})
 const _toggleDialog = () => ({
     type: USER_FORM_DIALOG_TOGGLE
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


