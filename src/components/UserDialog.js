import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { toggleDialog } from '../reducers/toggleActions'
import UserForm from './UserForm'

const UserDialog = ({ student, dialogToggle, toggle, history }) => {
    return (
        <div>
        <Dialog open={toggle} onClose={() => {
            dialogToggle()
            history.push('/students')}} >
        <DialogTitle>{student ? `Edit Profile:${" " + student.profile.first_name + " " + student.profile.last_name}` : "Welcome To Super Schools"}</DialogTitle>
            <DialogContent>
                <UserForm student={student} history={history} />
        </DialogContent>
        </Dialog>
        </div>
    )
}

const stateToProps = ({ students, toggles }, { match, history }) => {
    return {
        student: match.params.id ? students.find(_student => _student.id === match.params.id) : null,
        toggle: toggles.userFormDialog,
        history

    }
}
const dispatchToProps = (dispatch) => {
    return {
        dialogToggle: () => dispatch(toggleDialog())
    }
    }
export default connect(stateToProps, dispatchToProps)(UserDialog)