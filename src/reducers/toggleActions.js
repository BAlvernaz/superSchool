const SIDEMENU_TOGGLE = "SIDEMENU_TOGGLE"

export {
    SIDEMENU_TOGGLE,
}

const _toggleSideMenu = () => ({
    type: SIDEMENU_TOGGLE
})

export const toggleSideMenu = () => {
    return dispatch => {
        dispatch(_toggleSideMenu())
    }
}
