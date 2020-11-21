import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import UserForm from './UserForm'

const UserDialog = ({ student }) => {
    return (
        <div>
        <Dialog open={true} onClose={() => {
            dialogToggle()}} >
        <DialogTitle>{student ? `Edit Student:${" " + student.name}` : "New Person"}</DialogTitle>
            <DialogContent>
                <UserForm student={student} />
        </DialogContent>
        </Dialog>
        </div>
    )
}

const stateToProps = ({ students }, { match }) => {
    return {
        student: students.find(_student => _student.id === match.params.id)
    }

}

export default connect(stateToProps)(UserDialog)