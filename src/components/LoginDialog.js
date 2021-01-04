import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { toggleLogin } from '../reducers/toggleActions'
import LoginForm  from "./LoginForm"

const LoginDialog = ({toggle, dialogToggle}) => {
    return (
        <Dialog open={toggle} onClose={() => {
            dialogToggle()
        }}>
            <DialogTitle>Please Enter Your Login Creditials Below</DialogTitle>
            <DialogContent>
                <LoginForm />
            </DialogContent>
        </Dialog>
    )
}

const stateToProps = ({toggles}) => {
    return {
        toggle: toggles.loginFormDialog
    }
}

const dispatchToProps = (dispatch) => {
    return {
        dialogToggle: () => dispatch(toggleLogin())
    }
}

export default connect(stateToProps, dispatchToProps)(LoginDialog)