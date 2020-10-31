import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { toggleEditStudentDialog } from '../reducers/toggleActions'
import StudentForm from './StudentForm'

const EditStudentDialog = ({ editDialog, dialogToggle, student}) => {
    return (
        <div>
        <Dialog open={editDialog} onClose={() => {
            dialogToggle()}} >
            <DialogTitle>Edit Student:{" " + student.name}</DialogTitle>
            <DialogContent>
                <StudentForm student={student} />
            </DialogContent>
        </Dialog>
        </div>
    )
}

const stateToProps = ({ toggles, students }, { match }) => {
    return {
        editDialog: toggles.editStudentDialog,
        student: students.find(_student => _student.id === match.params.id)
    }

}

const dispatchToProps = dispatch => {
    return {
        dialogToggle: () => dispatch(toggleEditStudentDialog())
    }
}

export default connect(stateToProps, dispatchToProps)(EditStudentDialog)